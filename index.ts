import { Zoo } from "./src/Zoo";

const animals = [
  { id: "A", name: "Lion", skill: "bite" },
  { id: "B", name: "Tiger", skill: "claw" },
  { id: "C", name: "Bear", skill: "sleep" },
];

const app = new Zoo({
  entries: animals
});

app.mount();

declare global {
  interface Window {
    app: Zoo;
  }
}

window.app = app;

console.log(app);
