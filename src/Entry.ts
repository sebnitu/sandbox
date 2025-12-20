import { Parent } from "./Parent";

export class Entry {
  parent: Parent;
  item: Record<string, any>;
  name: string;

  constructor(parent: Parent, item: any) {
    this.parent = parent;
    this.item = item;
    this.name = `${item.id}-${item.num}`;
  }
}
