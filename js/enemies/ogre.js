import Enemy from './enemy.js';

class Ogre extends Enemy {
  constructor(name, level, type) {
    super(name, level, type);

    this.icon = '👹';
    this.mana = 10;
    this.health = 25;
  }
}

export default Ogre;