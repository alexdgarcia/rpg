// Every class has to be exported as a module to
// to be able to be imported elsewhere.
class Hero {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }

  greet() {
    console.log(`${this.name} says hello.`);
  }

  attack() {
    switch(this.job) {
      case 'Mage':
        console.log(`damage done is ${Math.round(this.level * 1.33)}`);
        return Math.round(this.level * 1.33);
        break;
      case 'Warrior':
        console.log(`damage done is ${Math.round(this.level * 2.5)}`);
        return Math.round(this.level * 2.5);
    }
  }
}

export default Hero;