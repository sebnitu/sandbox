function Animal(name, energy) {
  animal = Object.create(animalMethods);
  animal.name = name;
  animal.energy = energy;
  return animal;
}

const animalMethods = {
  eat(amount) {
    console.log(`${this.name} is eating`);
    this.energy += amount;
  },
  sleep(length) {
    console.log(`${this.name} is sleeping`);
    this.energy += length;
  },
  play(length) {
    console.log(`${this.name} is playing`);
    this.energy -= length;
  }
}

// Test...

const shadow = Animal('Shadow', 16);
const rhino = Animal('Rhino', 16);

shadow.play(8);
rhino.eat(8);

console.log(shadow);
console.log(rhino);

