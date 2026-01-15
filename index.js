import * as vrembem from "https://unpkg.com/vrembem@next/dist/index.js";

console.log("Vrembem", vrembem);

class Me {
  #state = "happy";

  constructor() {
    this.name = "Seb";
  }

  get state() {
    return this.#state;
  }

  set state(value) {
    this.#state = value;
    console.log(`I am very ${this.#state}`);
  }
}

let me = new Me();

me = new Proxy(me, {
  get(target, prop) {
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    if (prop === "state") {
      const oldValue = target[prop];
      if (oldValue === value) {
        console.log("Nothing has changed...");
        return true;
      }

      console.log(`My mood has changed... ${target.name}`);

      Reflect.set(target, prop, value); 

      return true;
    } else {
      return Reflect.set(target, prop, value);
    }
  }
});

window["me"] = me;
