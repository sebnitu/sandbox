import { CollectionEntry } from "./CollectionEntry";
import { Zoo } from "./Zoo";

export class ZooEntry extends CollectionEntry {
  skill: string;

  constructor(parent: Zoo, data: Record<string, any>) {
    super(parent, { ...data });
    this.skill = data.skill;
  }

  announce() {
    console.log(`My skill is ${this.skill}`);
  }
}
