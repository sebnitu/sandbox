import { Group } from "./Group";

export class GroupEntry<
  TParent extends Group<TParent, TEntry>,
  TEntry extends GroupEntry<TParent, TEntry>
> {
  parent: TParent;
  id: string;
  name: string;

  constructor(parent: TParent, data: Record<string, any>) {
    this.parent = parent;
    this.id = data.id;
    this.name = data.name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}
