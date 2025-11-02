import { Worker } from "node:worker_threads";
import { cpus } from "node:os";
import { randomUUID } from "node:crypto";

export class WorkerPool {
  #workers = [];
  #taskQueue = [];
  #maxTasksPerWorker;
  #onWorkerExit;
  #workerFile;
  #terminating = false;
  #taskTimeout;

  constructor({
    workerFile,
    size = Math.max(1, cpus().length - 1),
    maxTasksPerWorker = 10,
    onWorkerExit = "requeue",
    taskTimeout = 30_000, // default 30s timeout per task
  }) {
    if (!workerFile) throw new Error("workerFile is required");
    if (!["requeue", "reject"].includes(onWorkerExit))
      throw new Error(`Invalid onWorkerExit option: ${onWorkerExit}`);

    this.#workerFile = workerFile;
    this.#maxTasksPerWorker = maxTasksPerWorker;
    this.#onWorkerExit = onWorkerExit;
    this.#taskTimeout = taskTimeout;

    console.log(`🚀 Initializing worker pool with ${size} workers`);

    for (let i = 0; i < size; i++) {
      const workerId = `worker-${i + 1}`;
      const worker = new Worker(workerFile, { workerData: { workerId } });

      const workerInfo = {
        id: workerId,
        worker,
        pendingTasks: new Map(),
        restartCount: 0, // track restart frequency
        lastRestartTime: null,
        errorHandled: false, // prevent double-handling of error + exit
      };

      this.#workers.push(workerInfo);
      this.#bindWorkerEvents(workerInfo);
    }
  }

  #bindWorkerEvents(workerInfo) {
    const { worker, pendingTasks } = workerInfo;

    worker.on("message", (msg) => {
      const { taskId, result, error } = msg;
      const taskInfo = pendingTasks.get(taskId);
      if (!taskInfo) return;

      const { resolver, timeoutId } = taskInfo;

      // Clear timeout and provide better error context
      if (timeoutId) clearTimeout(timeoutId);

      if (error) {
        resolver.reject(new Error(`Task failed in ${workerInfo.id}: ${error}`));
      } else {
        resolver.resolve(result);
      }

      pendingTasks.delete(taskId);

      this.#processTaskQueue();
    });

    worker.on("error", (err) => {
      console.error(`❌ Worker ${workerInfo.id} error:`, err);

      workerInfo.errorHandled = true;

      const tasks = Array.from(workerInfo.pendingTasks.values());
      workerInfo.pendingTasks.clear();

      // Clear all timeouts
      for (const task of tasks) {
        if (task.timeoutId) clearTimeout(task.timeoutId);
      }

      // Use onWorkerExit strategy for error handling
      if (this.#onWorkerExit === "reject") {
        for (const { resolver } of tasks) {
          resolver.reject(
            new Error(
              `Worker ${workerInfo.id} encountered error: ${err.message}`
            )
          );
        }
      } else if (this.#onWorkerExit === "requeue") {
        console.log(
          `🔄 Requeuing ${tasks.length} tasks from ${workerInfo.id} after error`
        );
        for (const task of tasks) {
          this.#taskQueue.push({
            taskName: task.taskName,
            taskData: task.taskData,
            resolver: task.resolver,
          });
        }
        this.#processTaskQueue();
      }
    });

    worker.on("exit", (code) => {
      // If error was already handled, just restart the worker
      if (workerInfo.errorHandled) {
        workerInfo.errorHandled = false; // Reset flag for next time

        if (!this.#terminating) {
          // Still need to check for restart loops
          const now = Date.now();
          if (
            workerInfo.lastRestartTime &&
            now - workerInfo.lastRestartTime < 5000
          ) {
            workerInfo.restartCount++;
            if (workerInfo.restartCount >= 3) {
              console.error(
                `💀 Worker ${workerInfo.id} crashed ${workerInfo.restartCount} times in quick succession. Not restarting.`
              );
              return;
            }
          } else {
            workerInfo.restartCount = 0;
          }

          workerInfo.lastRestartTime = now;
          this.#restartWorker(workerInfo);
        }
        return;
      }

      const tasks = Array.from(workerInfo.pendingTasks.values());
      workerInfo.pendingTasks.clear();

      // Clear all timeouts
      for (const task of tasks) {
        if (task.timeoutId) clearTimeout(task.timeoutId);
      }

      if (this.#terminating) {
        // Reject pending tasks during termination
        for (const { resolver } of tasks) {
          resolver.reject(new Error("Worker pool terminated"));
        }
        return;
      }

      if (code !== 0) {
        console.warn(
          `⚠️ Worker ${workerInfo.id} exited with code ${code}. Handling ${tasks.length} pending tasks...`
        );

        if (this.#onWorkerExit === "reject") {
          for (const { resolver } of tasks) {
            resolver.reject(
              new Error(
                `Worker ${workerInfo.id} exited unexpectedly with code ${code}`
              )
            );
          }
        } else if (this.#onWorkerExit === "requeue") {
          for (const task of tasks) {
            // Remove resolver-specific data, create new promise for requeued task
            this.#taskQueue.push({
              taskName: task.taskName,
              taskData: task.taskData,
              resolver: task.resolver, // Preserve original promise resolver
            });
          }
          this.#processTaskQueue();
        }

        // IMPROVED: Detect restart loops (crash after crash)
        const now = Date.now();
        if (
          workerInfo.lastRestartTime &&
          now - workerInfo.lastRestartTime < 5000
        ) {
          workerInfo.restartCount++;
          if (workerInfo.restartCount >= 3) {
            console.error(
              `💀 Worker ${workerInfo.id} crashed ${workerInfo.restartCount} times in quick succession. Not restarting.`
            );
            return;
          }
        } else {
          workerInfo.restartCount = 0;
        }

        workerInfo.lastRestartTime = now;
        this.#restartWorker(workerInfo);
      }
    });
  }

  #restartWorker(workerInfo) {
    console.log(`🔄 Restarting ${workerInfo.id}...`);
    const newWorker = new Worker(this.#workerFile, {
      workerData: { workerId: workerInfo.id },
    });
    workerInfo.worker = newWorker;
    workerInfo.pendingTasks.clear(); // Ensure clean state
    this.#bindWorkerEvents(workerInfo);
  }

  #processTaskQueue() {
    // IMPROVED: Process multiple tasks in one call
    while (this.#taskQueue.length > 0) {
      const availableWorker = this.#workers.find(
        (w) => w.pendingTasks.size < this.#maxTasksPerWorker
      );

      if (!availableWorker) break; // No available workers

      const nextTask = this.#taskQueue.shift();
      if (!nextTask) break;

      this.#assignTaskToWorker(availableWorker, nextTask);
    }
  }

  #assignTaskToWorker(workerInfo, task) {
    const { resolver, taskName, taskData } = task;
    const taskId = randomUUID();

    // IMPROVED: Add timeout mechanism
    const timeoutId = this.#taskTimeout
      ? setTimeout(() => {
          const taskInfo = workerInfo.pendingTasks.get(taskId);
          if (taskInfo) {
            workerInfo.pendingTasks.delete(taskId);
            resolver.reject(
              new Error(
                `Task "${taskName}" timed out after ${this.#taskTimeout}ms in ${
                  workerInfo.id
                }`
              )
            );
            // Note: Worker continues running, might send late response (ignored)
          }
        }, this.#taskTimeout)
      : null;

    workerInfo.pendingTasks.set(taskId, {
      resolver,
      taskName,
      taskData,
      timeoutId,
      startTime: Date.now(), // NEW: for debugging/metrics
    });

    workerInfo.worker.postMessage({ taskId, taskName, taskData });
  }

  runTask(taskName, taskData) {
    if (this.#terminating) {
      return Promise.reject(new Error("Worker pool is terminating"));
    }

    return new Promise((resolve, reject) => {
      this.#taskQueue.push({
        resolver: { resolve, reject }, // IMPROVED: separate resolve/reject
        taskName,
        taskData,
      });

      this.#processTaskQueue();
    });
  }

  /**
   * Gracefully terminate all workers and reject pending tasks.
   */
  async terminate() {
    if (this.#terminating) return;

    console.log("🧹 Terminating all workers...");
    this.#terminating = true;

    // IMPROVED: Reject queued tasks
    while (this.#taskQueue.length > 0) {
      const task = this.#taskQueue.shift();
      task.resolver.reject(
        new Error("Worker pool terminated before task could run")
      );
    }

    // Terminate all workers
    await Promise.all(
      this.#workers.map(({ worker, pendingTasks }) => {
        // Clear timeouts
        for (const task of pendingTasks.values()) {
          if (task.timeoutId) clearTimeout(task.timeoutId);
        }
        return worker.terminate();
      })
    );

    this.#workers = [];
    console.log("✅ Worker pool terminated");
  }

  // NEW: Utility methods for monitoring
  getStats() {
    return {
      totalWorkers: this.#workers.length,
      queuedTasks: this.#taskQueue.length,
      activeTasks: this.#workers.reduce(
        (sum, w) => sum + w.pendingTasks.size,
        0
      ),
      workerDetails: this.#workers.map((w) => ({
        id: w.id,
        pendingTasks: w.pendingTasks.size,
        restartCount: w.restartCount,
      })),
    };
  }
}

const workerFile = new URL("./worker.js", import.meta.url).pathname;
const pool = new WorkerPool({ workerFile, size: 2, maxTaskPerWorker: 1 });

async function main() {
  const taskNames = Array.from({ length: 5 }, (_, i) => `task${(i % 3) + 1}`);
  await Promise.all(
    taskNames.map(async (taskName) => {
      try {
        const result = await pool.runTask(taskName, { someData: 123 });
        console.log(`Result of ${taskName}:`, result);
      } catch (error) {
        console.error(`Error in ${taskName}:`, error.message);
      }
    })
  );
  pool.terminate();
}

main();
