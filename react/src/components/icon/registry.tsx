import { type IconComponent } from "./types";

class Registry {
  #icons: Map<string, IconComponent> = new Map();
  register(name: string, component: IconComponent) {
    this.#icons.set(name, component);
  }
  get(name: string): IconComponent | undefined {
    return this.#icons.get(name);
  }
  require(name: string): IconComponent {
    const icon = this.get(name);
    if (!icon) {
      throw new Error(`Icon "${name}" not found in registry.`);
    }
    return icon;
  }
}

export const registry = new Registry();
