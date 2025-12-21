import { Group, GroupConfig } from "./Group";
import { ZooEntry } from "./ZooEntry";

interface ZooConfig extends GroupConfig {
  location: string;
}

const defaults: Partial<ZooConfig> = {
  location: ""
}

export class Zoo extends Group<ZooEntry, ZooConfig> {
  entry = ZooEntry;

  constructor(options: Partial<ZooConfig> = {}) {
    super({ ...defaults, ...options });
  }

  greetAll() {
    this.collection.forEach((entry) => {
      entry.greet();
      entry.announce();
    });
  }
}
