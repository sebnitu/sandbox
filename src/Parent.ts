import { Entry } from "./Entry";

export class Parent {
  config: Record<string, any>;
  entry: new (parent: Parent, item: Record<string, any>) => Entry = Entry;
  collection: Entry[] = [];

  constructor(options: Record<string, any> = {}) {
    this.config = { ...options };
  }

  mount(options: Record<string, any> = {}) {
    this.config = { ...this.config, ...options };

    for (const item of this.config.entries) {
      const entry = new this.entry(this, item);
      this.collection.push(entry);
    }
  }
}
