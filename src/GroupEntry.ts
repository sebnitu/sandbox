import { Group } from "./Group";

export class GroupEntry {
  parent: any;
  id: string;
  name: string;

  constructor(parent: any, data: Record<string, any>) {
    this.parent = parent;
    this.id = data.id;
    this.name = data.name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}
