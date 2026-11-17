type Operation = "landing" | "takeoff";

type Report =
  | { type: "request"; operation: Operation; emergency: boolean }
  | { type: "runway-vacated" };

type Instruction =
  | { type: "cleared"; operation: Operation }
  | { type: "hold"; position: number };

interface ControlTower {
  report(from: Aircraft, report: Report): void;
}

class Aircraft {
  readonly callSign: string;
  readonly #tower: ControlTower;

  constructor(callSign: string, tower: ControlTower) {
    this.callSign = callSign;
    this.#tower = tower;
  }

  requestLanding(emergency = false): void {
    console.log(
      `${this.callSign} ▶ requests landing${emergency ? " (EMERGENCY)" : ""}`,
    );
    this.#tower.report(this, {
      type: "request",
      operation: "landing",
      emergency,
    });
  }

  requestTakeoff(): void {
    console.log(`${this.callSign} ▶ requests takeoff`);
    this.#tower.report(this, {
      type: "request",
      operation: "takeoff",
      emergency: false,
    });
  }

  vacateRunway(): void {
    console.log(`${this.callSign} ▶ runway vacated`);
    this.#tower.report(this, { type: "runway-vacated" });
  }

  receive(instruction: Instruction): void {
    switch (instruction.type) {
      case "cleared":
        console.log(`${this.callSign} ◀ cleared for ${instruction.operation}`);
        break;
      case "hold":
        console.log(`${this.callSign} ◀ hold, number ${instruction.position}`);
        break;
    }
  }
}

interface Pending {
  aircraft: Aircraft;
  operation: Operation;
  emergency: boolean;
  lastPosition: number | undefined;
}

const priority = (p: Pending): number =>
  p.emergency ? 0 : p.operation === "landing" ? 1 : 2;

class RunwayTower implements ControlTower {
  #occupant: Aircraft | undefined;
  #queue: Pending[] = [];

  report(from: Aircraft, report: Report): void {
    switch (report.type) {
      case "request": {
        const known =
          from === this.#occupant ||
          this.#queue.some((e) => e.aircraft === from);
        if (known) return;

        this.#queue.push({
          aircraft: from,
          operation: report.operation,
          emergency: report.emergency,
          lastPosition: undefined,
        });
        this.#queue.sort((a, b) => priority(a) - priority(b));
        break;
      }
      case "runway-vacated":
        if (this.#occupant !== from) return;
        this.#occupant = undefined;
        break;
    }

    this.#dispatch();
  }

  #dispatch(): void {
    if (!this.#occupant) {
      const next = this.#queue.shift();
      if (next) {
        this.#occupant = next.aircraft;
        next.aircraft.receive({ type: "cleared", operation: next.operation });
      }
    }

    this.#queue.forEach((entry, i) => {
      const position = i + 1;
      if (entry.lastPosition === position) return;
      entry.lastPosition = position;
      entry.aircraft.receive({ type: "hold", position });
    });
  }
}

const tower = new RunwayTower();

const aal = new Aircraft("AAL100", tower);
const ual = new Aircraft("UAL200", tower);
const dlh = new Aircraft("DLH300", tower);
const med = new Aircraft("MED911", tower);

aal.requestLanding(); // runway free → cleared
ual.requestLanding(); // hold #1
dlh.requestTakeoff(); // hold #2
med.requestLanding(true); // emergency jumps the queue; others get re-sequenced

console.log("— runway frees up —");
aal.vacateRunway(); // MED911 goes next
med.vacateRunway(); // then UAL200
ual.vacateRunway(); // then DLH300
dlh.vacateRunway();
