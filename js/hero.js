// Every class has to be exported as a module to
// to be able to be imported elsewhere.
class Hero {
  constructor(name, level) {
    this.name = name;
    this.level = level;
    this.class = "hero";
  }

  greet() {
    console.log(`${this.name} says hello.`);
  }

  attack() {
    if (this.job === 'Mage') {
      return {
        damage: Math.round(this.level * 1.33),
        weapon: this.weapon,
      };
    }

    return {
      damage: Math.round(this.level * 2.5),
      weapon: this.weapon,
    }
  }
}

export default Hero;