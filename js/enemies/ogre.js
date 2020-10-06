import Enemy from './enemy.js';

class Ogre extends Enemy {
  constructor(name, level, type) {
    super(name, level, type);

    this.icon = '👹';
    this.mana = 10;
  }
}

export default Ogre;