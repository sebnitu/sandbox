import { Parent } from "./src/Parent";

const items = [
  { id: "A", num: "1" },
  { id: "B", num: "2" },
  { id: "C", num: "3" },
];

const parent = new Parent({
  entries: items
});

parent.mount();

console.log(parent);
