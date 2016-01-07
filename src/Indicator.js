const RADIUS = 6.5;

export default class Indicator {
  constructor(isActive = false) {
    this.circle = new createjs.Shape();
    this.isActive = isActive;

    this.circle.regX = RADIUS / 2;
    this.circle.regY = RADIUS / 2;
    this.draw();

    return this.circle;
  }
  draw() {
    const color = this.isActive ? '#9A9A9A' : '#D8D8D8';

    this.circle.graphics.beginFill(color).drawCircle(10, 0, RADIUS);
  }
  toggleActive() {
    this.isActive = !this.isActive;
    this.draw();
  }
}
