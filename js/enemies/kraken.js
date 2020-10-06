import Enemy from './enemy.js';

class Kraken extends Enemy {
  constructor(name, level, type) {
    super(name, level, type);

    this.icon = '🦑';
  }
}

export default Kraken;