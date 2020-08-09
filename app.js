// FUNCTIONAL

const Animal = function (options) {
  defaults = {
    name: '',
    sound: '',
    color: ''
  }
  this.settings = { ...defaults, ...options };
  this.speak = () => {
    console.log(`${this.settings.name} said:`, this.settings.sound);
  }
  return this;
}

// OOP

// class Animal {
//   constructor(options) {
//     const defaults = {
//       name: '',
//       sound: '',
//       color: ''
//     }
//     this.settings = { ...defaults, ...options }
//   }

//   speak() {
//     console.log(`${this.settings.name} said:`, this.settings.sound);
//   }
// }

// TEST

const lion = new Animal({
  name: 'Lion',
  sound: 'Roar'
});

const cow = new Animal({
  name: 'Cow',
  sound: 'Moo'
});

cow.settings.size = '';

console.log(Animal);
console.log(lion);
console.log(cow);

lion.speak();
cow.speak();

console.log('cow: ' + cow.constructor);

// Tree

function Tree(name) {
  this.name = name
}

let theTree = new Tree('Redwood')
console.log('theTree.constructor is ' + theTree.constructor)
