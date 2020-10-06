import Enemy from './enemy.js';

class Unknown extends Enemy {
  constructor(name, level, type) {
    super(name, level, type);

    this.icon = '🧿';
  }
}

export default Unknown;