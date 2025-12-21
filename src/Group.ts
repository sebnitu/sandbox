import { GroupEntry, GroupEntryConstructor } from "./GroupEntry";

export interface GroupConfig {
  source: Record<string, any>[];
  title: string;
  isActive: boolean;
}

const defaults: GroupConfig = {
  source: [],
  title: "",
  isActive: false
}

export class Group<
  TEntry extends GroupEntry = GroupEntry,
  TConfig extends GroupConfig = GroupConfig
> {
  config: TConfig;
  collection: TEntry[] = [];
  entryClass: GroupEntryConstructor<TEntry> = GroupEntry as GroupEntryConstructor<TEntry>;

  constructor(options: Partial<TConfig> = {}) {
    this.config = { ...defaults, ...options } as TConfig;
  }

  get(key: string) {
    return this.collection.find((entry) => entry.id === key);
  }

  mount(options: Partial<TConfig> = {}) {
    this.config = { ...this.config, ...options };

    for (const item of this.config.source) {
      const entry = new this.entryClass(this, item);
      this.collection.push(entry);
    }
  }
}
