import Hero from './hero.js';

class Warrior extends Hero {
  constructor(name, level, job) {
    super(name, level);

    this.job = job;
    this.weapon = 'longsword'
    this.health = 40;
    this.mana = 10;
    this.icon = '🤺';
  }
}

export default Warrior;