function Animal(name, energy) {
  animal = {};
  animal.name = name;
  animal.energy = energy;

  animal.eat = function (amount) {
    console.log(`${this.name} is eating`);
    this.energy += amount;
  }

  animal.sleep = function (length) {
    console.log(`${this.name} is sleeping`);
    this.energy += length;
  }

  animal.play = function (length) {
    console.log(`${this.name} is playing`);
    this.energy -= length;
  }

  return animal;
}

// Test...

const shadow = Animal('Shadow', 16);
const rhino = Animal('Rhino', 16);

shadow.play(8);
rhino.eat(8);

console.log(shadow);
console.log(rhino);

