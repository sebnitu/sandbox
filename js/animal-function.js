function Animal(name, energy) {
  // animal = Object.create(animalMethods);
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

// const animalMethods = {
//   eat(amount) {
//     console.log(`${this.name} is eating`);
//     this.energy += amount;
//   },
//   sleep(length) {
//     console.log(`${this.name} is sleeping`);
//     this.energy += length;
//   },
//   play(length) {
//     console.log(`${this.name} is playing`);
//     this.energy -= length;
//   }
// }

const shadow = Animal('Shadow', 8);
const rhino = Animal('Rhino', 10);

shadow.eat(4);
rhino.play(6);

console.log(shadow);
console.log(rhino);

