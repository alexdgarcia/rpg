import Hero from './hero.js';
// We can extend classes. This allows us
// to create objects with additional features
// but that should use the parent as a
// blueprint.
class Mage extends Hero {
  // This is how the constructor is implemented
  // inside a class:
  constructor(name, level, job) {
    // super keyword is used to access
    // the parent constructor.
    super(name, level);
    // After which we can extend declare props
    // specific to instances of this class
    this.job = job;
    this.weapon = 'bow staff'
    this.health = 25;
    this.mana = 30;
    this.icon = '🧙';
    this.magic = {
      "Fire": this.fire,
    }
  }

  // Adding a new property only to Mage
  // instances:
  fire() {
    const cost = 5;

    if (this.mana >= cost) {
      console.log(`${this.name} uses fire`);
      this.mana -= cost;
      return this.level * 3;
    }
  }
}

export default Mage;