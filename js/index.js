class Character {
    constructor(name, health, damage, healthBarId) {
      this.name = name;
      this.health = health;
      this.maxHealth = health;
      this.damage = damage;
      this.healthBar = document.getElementById(healthBarId);
      this.updateHealthBar();
    }
  
    isAlive() {
      return this.health > 0;
    }
  
    attack(target) {
      if (target.isAlive()) {
        console.log(`${this.name} inflige ${this.damage} de daÃ±o a ${target.name}`);
        target.health -= this.damage;
        if (target.health < 0) target.health = 0;
        target.updateHealthBar();
      }
    }
  
    updateHealthBar() {
      const healthPercentage = (this.health / this.maxHealth) * 100;
      this.healthBar.style.width = healthPercentage + '%';
    }
  }
  
  const hero = new Character("Heroe", 100, 10, "hero-health");
  const enemy = new Character("Enemigo", 100, 5, "enemy-health");
  
  document.getElementById('hero-attack').addEventListener('click', function() {
    if (hero.isAlive() && enemy.isAlive()) {
      hero.attack(enemy);
      if (!enemy.isAlive()) {
        alert("El Enemigo ha sido derrotado!");
      }
    }
  });
  
  document.getElementById('enemy-attack').addEventListener('click', function() {
    if (enemy.isAlive() && hero.isAlive()) {
      enemy.attack(hero);
      if (!hero.isAlive()) {
        alert("El Heroe ha sido derrotado!");
      }
    }
  });