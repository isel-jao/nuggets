export interface BackoffStrategy {
  delay(attempt: number): number;
}

export class FixedBackoff implements BackoffStrategy {
  constructor(private readonly ms: number) {}
  delay(): number {
    return this.ms;
  }
}

interface LinearBackoffOptions {
  step: number;
  max?: number;
}

export class LinearBackoff implements BackoffStrategy {
  constructor(private readonly options: LinearBackoffOptions) {}
  delay(attempt: number): number {
    const delay = this.options.step * attempt;
    return this.options.max !== undefined
      ? Math.min(delay, this.options.max)
      : delay;
  }
}

interface ExponentialBackoffOptions {
  base: number;
  max?: number;
  jitter?: boolean;
}

export class ExponentialBackoff implements BackoffStrategy {
  constructor(private readonly options: ExponentialBackoffOptions) {}

  delay(attempt: number): number {
    const capped = Math.min(
      this.options.max ?? Infinity,
      this.options.base * 2 ** (attempt - 1),
    );
    return this.options.jitter ? Math.random() * capped : capped; // "full jitter"
  }
}

interface WithRetryOptions<Args extends unknown[], Result> {
  maxAttempts?: number;
  strategy?: BackoffStrategy;
  callback: (...args: Args) => Result;
  onRetry?: (options: {
    attempt: number;
    delay: number;
    error: unknown;
  }) => void;
}

export const DEFAULT_MAX_ATTEMPTS = 5;
export const DEFAULT_STRATEGY: BackoffStrategy = new ExponentialBackoff({
  base: 100,
  max: 5_000,
  jitter: true,
});

function withRetry<Args extends unknown[], Result>(
  options: WithRetryOptions<Args, Result>,
): (...args: Args) => Promise<Awaited<Result>> {
  const {
    maxAttempts = DEFAULT_MAX_ATTEMPTS,
    strategy = DEFAULT_STRATEGY,
    callback,
    onRetry,
  } = options;

  return async (...args: Args): Promise<Awaited<Result>> => {
    for (let attempt = 1; ; attempt++) {
      try {
        // Promise.try turns sync throws into rejections and wraps plain return values
        return await Promise.try(callback, ...args);
      } catch (error) {
        if (attempt >= maxAttempts) throw error;
        const delay = strategy.delay(attempt);
        onRetry?.({ attempt, delay, error });
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };
}
// example usage

function SyncFunctionThatMightFail(url: string): string {
  if (Math.random() < 0.7) {
    throw new Error("Network error");
  } else {
    return `Data fetched from ${url} successfully`;
  }
}

function AsyncFunctionThatMightFail(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.7) {
      reject(new Error("Network error"));
    } else {
      resolve(`Data fetched from ${url} successfully`);
    }
  });
}

async function main() {
  const url = "https://example.com/api/data";
  const strategy = new ExponentialBackoff({
    base: 100,
    max: 2000,
    jitter: true,
  });

  const retrySync = withRetry({
    maxAttempts: 5,
    strategy,
    callback: SyncFunctionThatMightFail,
    onRetry: ({ attempt, delay }) => {
      console.log(
        `Sync attempt ${attempt} failed. Retrying in ${delay.toFixed(0)} ms...`,
      );
    },
  });

  const retryAsync = withRetry({
    maxAttempts: 5,
    strategy,
    callback: AsyncFunctionThatMightFail,
    onRetry: ({ attempt, delay }) => {
      console.log(
        `Async attempt ${attempt} failed. Retrying in ${delay.toFixed(0)} ms...`,
      );
    },
  });

  console.log("Starting sync operation...");
  try {
    const result = await retrySync(url);
    console.log(result);
  } catch (error) {
    console.error("Sync operation failed after retries:", error);
  }

  console.log("\nStarting async operation...");
  try {
    const result = await retryAsync(url);
    console.log(result);
  } catch (error) {
    console.error("Async operation failed after retries:", error);
  }
}

main().catch((error) => {
  console.error("Unexpected error:", error);
});
