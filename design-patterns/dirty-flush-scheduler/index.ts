// dirty-flush-scheduler.ts
// Glitch-free reactive DAG evaluation. The Graph owns ALL topology
// (forward deps + reverse dependents + heights), keyed by id. A node holds
// only its state — it has no idea what it reads or who reads it.
//
// A source change marks dependents dirty and defers a flush to a microtask.
// The flush recomputes dirty nodes in topological order (by height), so every
// node reads fully-settled inputs and runs at most once per cycle — no glitches.

type NodeId = string;
type Read = (id: NodeId) => unknown;
type Compute = (read: Read) => unknown;

interface Node {
  value: unknown;
  /** null marks a source (driven by set(), never recomputed). */
  compute: Compute | null;
}

export class Graph {
  private nodes = new Map<NodeId, Node>();
  /** Forward edges: id -> the ids it reads (from acorn extractDeps). */
  private deps = new Map<NodeId, readonly NodeId[]>();
  /** Reverse edges: id -> the ids that read it. */
  private dependents = new Map<NodeId, Set<NodeId>>();
  /** Topological rank = longest path from a source. */
  private height = new Map<NodeId, number>();

  /** Dirty queue, bucketed by height; index === height. */
  private buckets: Array<Set<NodeId> | undefined> = [];
  private scheduled = false;
  private flushing = false;

  /** Scope accessor handed to compute fns. In Forge this is the scope Proxy. */
  private read: Read = (id) => this.nodes.get(id)!.value;

  get(id: NodeId): unknown {
    return this.nodes.get(id)!.value;
  }

  /** A source node — a value the caller drives via set(). */
  source(id: NodeId, initial: unknown): void {
    this.register(id, null, []);
    this.nodes.get(id)!.value = initial;
  }

  /** A derived node. `deps` are the ids its expression references.
   *  Deps must already be registered (define in dependency order). */
  computed(id: NodeId, compute: Compute, deps: readonly NodeId[] = []): void {
    this.register(id, compute, deps);
    this.nodes.get(id)!.value = compute(this.read); // eager initial eval
  }

  private register(
    id: NodeId,
    compute: Compute | null,
    deps: readonly NodeId[],
  ): void {
    if (this.nodes.has(id)) throw new Error(`duplicate node: ${id}`);
    this.nodes.set(id, { value: undefined, compute });
    this.deps.set(id, deps);
    this.dependents.set(id, new Set());
    let h = 0;
    for (const dep of deps) {
      const back = this.dependents.get(dep);
      if (!back) throw new Error(`unknown dep "${dep}" referenced by "${id}"`);
      back.add(id);
      h = Math.max(h, this.height.get(dep)! + 1);
    }
    this.height.set(id, h);
  }

  /** Drive a source. Marks dependents dirty + schedules a flush. */
  set(id: NodeId, value: unknown): void {
    const node = this.nodes.get(id)!;
    if (Object.is(node.value, value)) return;
    node.value = value;
    for (const dep of this.dependents.get(id)!) this.markDirty(dep);
  }

  private markDirty(id: NodeId): void {
    const h = this.height.get(id)!;
    const bucket = (this.buckets[h] ??= new Set());
    if (bucket.has(id)) return; // dedup — each node queued at most once per cycle
    bucket.add(id);
    this.schedule();
  }

  private schedule(): void {
    if (this.scheduled || this.flushing) return;
    this.scheduled = true;
    queueMicrotask(() => this.flush());
  }

  /** Drain the dirty queue in topological order. Call directly for synchronous
   *  flushing; otherwise it runs on a microtask. Compute fns must be pure — a
   *  recompute may only dirty higher buckets, which is what lets a single
   *  forward pass settle the whole graph. */
  flush(): void {
    this.scheduled = false;
    this.flushing = true;
    try {
      for (let h = 0; h < this.buckets.length; h++) {
        const bucket = this.buckets[h];
        if (!bucket) continue;
        while (bucket.size > 0) {
          const id = bucket.values().next().value as NodeId;
          bucket.delete(id);
          const node = this.nodes.get(id)!;
          const next = node.compute!(this.read);
          if (!Object.is(next, node.value)) {
            node.value = next;
            for (const dep of this.dependents.get(id)!) this.markDirty(dep);
          }
        }
      }
      this.buckets.length = 0;
    } finally {
      this.flushing = false;
    }
  }
}

const g = new Graph();

// --- sources: widget input values -------------------------------------------
g.source("firstNameInput", "Ada");
g.source("lastNameInput", "Lovelace");

// --- computed variables (deps = the ids acorn's extractDeps returned) -------
g.computed(
  "fullName",
  (read) => {
    console.log("fullName recompute");
    return `${read("firstNameInput") as string} ${read("lastNameInput") as string}`.trim();
  },
  ["firstNameInput", "lastNameInput"],
);

let greetingRuns = 0;
g.computed(
  "greeting",
  (read) => {
    console.log("greeting recompute");
    greetingRuns++;
    return `Hello, ${read("fullName") as string}!`;
  },
  ["fullName"], // depends on fullName, NOT directly on the inputs — propagation is transitive
);

// console.log("init:   ", g.get("greeting")); // Hello, Ada Lovelace!

// --- drive sources. No manual flush(): it's deferred to a microtask --------
const tick = () => new Promise<void>((r) => queueMicrotask(r));

greetingRuns = 0;
g.set("firstNameInput", "Grace");
g.set("lastNameInput", "Hopper"); // two edits in the SAME tick
g.set("lastNameInput", "Hopper"); // no-op, same value

// await tick(); // the auto-scheduled flush runs here, once

// console.log("updated:", g.get("greeting")); // Hello, Grace Hopper!
// console.log("fullName recompute path -> greeting recomputes:", greetingRuns);
