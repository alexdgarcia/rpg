import Enemy from './enemy.js';

class Dragon extends Enemy {
  constructor(name, level, type) {
    super(name, level, type);

    this.icon = '🐉';
  }
}

export default Dragon;