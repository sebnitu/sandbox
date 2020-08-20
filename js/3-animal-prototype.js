function Animal(name, energy) {
  animal = Object.create(Animal.prototype);
  animal.name = name;
  animal.energy = energy;
  return animal;
}

// A prototype is a property on a function that points to an object

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating`);
  this.energy += amount;
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping`);
  this.energy += length;
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing`);
  this.energy -= length;
}

// Test...

const shadow = Animal('Shadow', 16);
const rhino = Animal('Rhino', 16);

shadow.play(8);
rhino.eat(8);

console.log(shadow);
console.log(rhino);

