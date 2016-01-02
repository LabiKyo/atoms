import {
  PAGE_WIDTH,
  PAGE_HEIGHT,
  REACTOR_WIDTH,
  REACTOR_HEIGHT,
  REACTOR_X,
  REACTOR_Y,
  SPEED_FACTOR,
  ROTATION_SPEED_FACTOR,
} from './consts';

export default class ElementBall {
  constructor(image) {
    this.bitmap = new createjs.Bitmap(image);
    this.radius = image.width / 2;
    this.initialize();
    this.randomize();
    this.setupBitmap();
    return this.bitmap;
  }
  // actions
  initialize() {
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.speedRotate = 0;
  }
  randomize() {
    do {
      this.getRandomPosition();
    } while (!this.isPositionValid());
    this.getRandomRotation();
    this.getRandomSpeed();
  }
  setupBitmap() {
    this.bitmap.regX = this.radius;
    this.bitmap.regY = this.radius;
    this.syncBitmap();
    this.bitmap.on('tick', this.onTick, this);
  }

  // handlers
  onTick() {
    const newX = this.x + this.speedX;
    const newY = this.y + this.speedY;

    if (!this.isXValid(newX) || newX < 0 || newX > PAGE_WIDTH) {
      this.speedX = -this.speedX;
    }
    if (!this.isYValid(newY) || newY < 0 || newY > PAGE_HEIGHT) {
      this.speedY = -this.speedY;
    }
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
    this.rotation = this.rotation + this.speedRotate;
    this.syncBitmap();
  }

  // helpers
  syncBitmap() {
    this.bitmap.x = this.x;
    this.bitmap.y = this.y;
    this.bitmap.rotation = this.rotation;
  }
  getRandomPosition() {
    this.x = Math.random() * PAGE_WIDTH;
    this.y = Math.random() * PAGE_HEIGHT;
  }
  getRandomRotation() {
    this.rotation = Math.random() * 360;
  }
  getRandomDirection() {
    return Math.random() - 0.5;
  }
  getRandomSpeed() {
    this.speedX = this.getRandomDirection() * SPEED_FACTOR;
    this.speedY = this.getRandomDirection() * SPEED_FACTOR;
    this.speedRotate = this.getRandomDirection() * ROTATION_SPEED_FACTOR;
  }
  isPositionValid() {
    return this.isXValid() && this.isYValid();
  }
  isXValid(x = this.x) {
    return (
      x + this.radius < REACTOR_X ||
      x - this.radius > REACTOR_X + REACTOR_WIDTH
    );
  }
  isYValid(y = this.y) {
    return (
      y + this.radius < REACTOR_Y ||
      y - this.radius > REACTOR_Y + REACTOR_HEIGHT
    );
  }
}
