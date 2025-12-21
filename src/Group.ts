import { GroupEntry } from "./GroupEntry";

export interface GroupConfig {
  entries: Record<string, any>[];
  title: string;
  isActive: boolean;
}

const defaults: GroupConfig = {
  entries: [],
  title: "",
  isActive: false
}

export class Group<
  TEntry extends GroupEntry = GroupEntry,
  TConfig extends GroupConfig = GroupConfig
> {
  config: TConfig;
  collection: TEntry[] = [];
  entry!: new (
    parent: any,
    data: Record<string, any>
  ) => TEntry;

  constructor(options: Partial<TConfig> = {}) {
    this.config = { ...defaults, ...options } as TConfig;
  }

  get(key: string) {
    return this.collection.find((entry) => entry.id === key);
  }

  mount(options: Partial<TConfig> = {}) {
    this.config = { ...this.config, ...options };

    for (const item of this.config.entries) {
      const entry = new this.entry(this, item);
      this.collection.push(entry);
    }
  }
}
