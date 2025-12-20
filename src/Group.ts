import { GroupEntry } from "./GroupEntry";

export class Group<
  TParent extends Group<TParent, TEntry>,
  TEntry extends GroupEntry<TParent, TEntry>
> {
  config: Record<string, any>;
  collection: TEntry[] = [];
  entry!: new (
    parent: TParent,
    data: Record<string, any>
  ) => TEntry;

  constructor(options: Record<string, any> = {}) {
    this.config = { ...options };
  }

  get(key: string) {
    return this.collection.find((entry) => entry.id === key);
  }

  mount(options: Record<string, any> = {}) {
    this.config = { ...this.config, ...options };

    for (const item of this.config.entries) {
      const entry = new this.entry(this as unknown as TParent, item);
      this.collection.push(entry);
    }
  }
}
