class Animal {
  constructor(name, energy) {
    this.name = name;
    this.energy = energy;
  }

  eat(amount) {
    console.log(`${this.name} is eating`);
    this.energy += amount;
  }

  sleep(length) {
    console.log(`${this.name} is sleeping`);
    this.energy += length;
  }

  play(length) {
    console.log(`${this.name} is playing`);
    this.energy -= length;
  }
}

// Test...

const shadow = new Animal('Shadow', 16);
const rhino = new Animal('Rhino', 16);

shadow.play(8);
rhino.eat(8);

console.log(shadow);
console.log(rhino);
