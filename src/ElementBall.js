import {
  REACTOR_WIDTH,
  REACTOR_HEIGHT,
  SPEED_FACTOR,
  ROTATION_SPEED_FACTOR,
} from './consts';
import { V, Box, Circle, Response, testPolygonCircle } from 'sat';

const REACTOR_X = (PAGE_WIDTH - REACTOR_WIDTH) / 2;
const REACTOR_Y = (PAGE_HEIGHT - REACTOR_HEIGHT) / 2;

const reactionBox = new Box(
  new V(REACTOR_X, REACTOR_Y),
  REACTOR_WIDTH,
  REACTOR_HEIGHT
).toPolygon();

export default class ElementBall {
  constructor(image) {
    this.bitmap = new createjs.Bitmap(image);
    this.radius = image.width / 3 / 2;
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
    this.response = new Response();
  }
  randomize() {
    do {
      this.getRandomPosition();
    } while (!this.isPositionValid());
    this.getRandomRotation();
    this.getRandomSpeed();
  }
  setupBitmap() {
    this.bitmap.regX = this.radius * 3;
    this.bitmap.regY = this.radius * 3;
    this.bitmap.scaleX = 1 / 3;
    this.bitmap.scaleY = 1 / 3;
    this.bitmap.on('tick', this.onTick, this);
    this.bitmap.on('click', () => {
      console.log('bitmap click');
    });
  }

  // handlers
  onTick() {
    this.detectCollision();
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
    this.circle = new Circle(new V(this.x, this.y), this.radius);
    this.response.clear();
    return !testPolygonCircle(reactionBox, this.circle, this.response);
  }
  detectCollision() {
    const newX = this.x + this.speedX;
    const newY = this.y + this.speedY;
    const newCircle = new Circle(new V(newX, newY), this.radius);

    this.response.clear();
    const collided = testPolygonCircle(reactionBox, newCircle, this.response);

    if (
      (collided && this.response.overlapV.x) ||
      newX < 0 ||
      newX > PAGE_WIDTH
    ) {
      this.speedX = -this.speedX;
    }
    if (
      (collided && this.response.overlapV.y) ||
      newY < 0 ||
      newY > PAGE_HEIGHT
    ) {
      this.speedY = -this.speedY;
    }
  }
}
