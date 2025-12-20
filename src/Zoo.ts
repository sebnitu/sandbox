import { Collection } from "./Collection";
import { ZooEntry } from "./ZooEntry";

export class Zoo extends Collection {
  collection: ZooEntry[] = [];
  entry: new (
    parent: Zoo,
    data: Record<string, any>
  ) => ZooEntry = ZooEntry;

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
