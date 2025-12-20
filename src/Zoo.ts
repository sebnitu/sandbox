import { Group } from "./Group";
import { ZooEntry } from "./ZooEntry";

export class Zoo extends Group<Zoo, ZooEntry> {
  entry = ZooEntry;

  constructor(options: Record<string, any> = {}) {
    super({ ...options });
  }

  greetAll() {
    this.collection.forEach((entry) => {
      entry.greet();
      entry.announce();
    });
  }
}
