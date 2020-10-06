class Enemy {
  constructor(name, level, type) {
    this.name = name;
    this.level = level;
    this.type = type;
  }

  attack() {
    console.log(`Damage dealt is ${this.level * Math.round(1.5)}`);
    return Math.round(1.5);
  }
}

export default Enemy;