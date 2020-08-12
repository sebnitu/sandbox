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

const shadow = new Animal('Shadow', 8);
const rhino = new Animal('Rhino', 10);

shadow.eat(4);
rhino.play(6);

console.log(shadow);
console.log(rhino);
