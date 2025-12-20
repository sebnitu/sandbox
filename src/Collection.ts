import { CollectionEntry } from "./CollectionEntry";

export class Collection {
  config: Record<string, any>;
  collection: CollectionEntry[] = [];
  entry: new (
    parent: Collection,
    data: Record<string, any>
  ) => CollectionEntry = CollectionEntry;

  constructor(options: Record<string, any> = {}) {
    this.config = { ...options };
  }

  get(key: string) {
    return this.collection.find((entry) => entry.id === key);
  }

  mount(options: Record<string, any> = {}) {
    this.config = { ...this.config, ...options };

    for (const item of this.config.entries) {
      const entry = new this.entry(this, item);
      this.collection.push(entry);
    }
  }
}
