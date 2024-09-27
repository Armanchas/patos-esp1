const selectedHero = localStorage.getItem('selectedHero') || 'white-duck';
const selectedEnemy = localStorage.getItem('selectedEnemy') || 'yellow-duck';

document.getElementById('hero-img').style.backgroundImage = `url('assets/spritesheets/${selectedHero}.png')`;
document.getElementById('enemy-img').style.backgroundImage = `url('assets/spritesheets/${selectedEnemy}.png')`;

const heroFrames = [
  '-2px -8px',
  '-34px -8px',
  '-66px -8px',
  '-98px -8px',
  '-130px -8px',
  '-160px -8px'
];

const enemyFrames = [
  '-2px -8px',
  '-34px -8px',
  '-66px -8px',
  '-98px -8px',
  '-130px -8px',
  '-160px -8px'
];

class Character {
  constructor(name, health, damage, healthBarId, spriteId, frames) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.damage = damage;
    this.healthBar = document.getElementById(healthBarId);
    this.sprite = document.getElementById(spriteId);
    this.frames = frames;
    this.currentFrame = 0;
    this.updateHealthBar();
    this.position = { x: 0, y: 0 }; 
    this.facingRight = true; 
    this.isMoving = false;
    this.animationInterval = null;
  }

  isAlive() {
    return this.health > 0;
  }

    attack(target) {
    if (!this.isAlive() || !target.isAlive()) return;
  
    const attackLine = document.createElement('div');
    attackLine.className = 'attack-line';
    document.body.appendChild(attackLine);
  
    const startX = this.position.x + (this.facingRight ? 32 : -32);
    const startY = Math.random() * window.innerHeight; 
    const endX = this.facingRight ? window.innerWidth : 0;
  
    attackLine.style.left = `${startX}px`;
    attackLine.style.top = `${startY}px`; 
    attackLine.style.width = `${Math.abs(endX - startX)}px`;
  
    if (this.checkCollision(attackLine, target.sprite)) {
      target.health -= this.damage;
      if (target.health < 0) target.health = 0;
      target.updateHealthBar();
    }
  
    setTimeout(() => {
      document.body.removeChild(attackLine);
    }, 200); 
  }

  checkCollision(attackLine, targetSprite) {
    const attackLineRect = attackLine.getBoundingClientRect();
    const targetRect = targetSprite.getBoundingClientRect();

    return (
      attackLineRect.left < targetRect.right &&
      attackLineRect.right > targetRect.left &&
      attackLineRect.top < targetRect.bottom &&
      attackLineRect.bottom > targetRect.top
    );
  }

  updateHealthBar() {
    const healthPercentage = (this.health / this.maxHealth) * 100;
    this.healthBar.style.width = healthPercentage + '%';
  }

  startAnimation() {
    if (this.animationInterval) return;
    this.animationInterval = setInterval(() => {
      this.sprite.style.backgroundPosition = this.frames[this.currentFrame];
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    }, 80);
  }

  stopAnimation() {
    clearInterval(this.animationInterval);
    this.animationInterval = null;
    this.currentFrame = 0;
    this.sprite.style.backgroundPosition = this.frames[this.currentFrame];
  }

  move(dx, dy) {
    this.position.x += dx;
    this.position.y += dy;

    if (dx !== 0 || dy !== 0) {
      if (!this.isMoving) {
        this.startAnimation();
        this.isMoving = true;
      }
    } else {
      if (this.isMoving) {
        this.stopAnimation();
        this.isMoving = false;
      }
    }

    if (dx > 0 && !this.facingRight) {
      this.facingRight = true;
    } else if (dx < 0 && this.facingRight) {
      this.facingRight = false;
    }

    const scaleX = this.facingRight ? 1 : -1;
    this.sprite.style.transform = `translate(${this.position.x}px, ${this.position.y}px) scale(3) scaleX(${scaleX})`;
  }
}

const hero = new Character("Heroe", 100, 10, "hero-health", "hero-img", heroFrames);
const enemy = new Character("Enemigo", 100, 5, "enemy-health", "enemy-img", enemyFrames);

const keys = {};

document.addEventListener('keydown', function(event) {
  keys[event.key] = true;
});

document.addEventListener('keyup', function(event) {
  keys[event.key] = false;
});

setInterval(() => {
  if (keys['e'] || keys['E']) {
    hero.attack(enemy);
  }
  if (keys['/']) {
    enemy.attack(hero);
  }
  let heroMoving = false;
  let enemyMoving = false;

  if (keys['w'] || keys['W']) {
    hero.move(0, -10); 
    heroMoving = true;
  }
  if (keys['a'] || keys['A']) {
    hero.move(-10, 0);
    heroMoving = true;
  }
  if (keys['s'] || keys['S']) {
    hero.move(0, 10); 
    heroMoving = true;
  }
  if (keys['d'] || keys['D']) {
    hero.move(10, 0); 
    heroMoving = true;
  }
  if (!heroMoving) {
    hero.stopAnimation();
    hero.isMoving = false;
  }

  if (keys['ArrowUp']) {
    enemy.move(0, -10);
    enemyMoving = true;
  }
  if (keys['ArrowLeft']) {
    enemy.move(-10, 0);
    enemyMoving = true;
  }
  if (keys['ArrowDown']) {
    enemy.move(0, 10); 
    enemyMoving = true;
  }
  if (keys['ArrowRight']) {
    enemy.move(10, 0);
    enemyMoving = true;
  }
  if (!enemyMoving) {
    enemy.stopAnimation();
    enemy.isMoving = false;
  }
}, 80);