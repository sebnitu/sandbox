import { Collection } from "./Collection";

export class CollectionEntry {
  parent: Collection;
  id: string;
  name: string;

  constructor(parent: Collection, data: Record<string, any>) {
    this.parent = parent;
    this.id = data.id;
    this.name = data.name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}
