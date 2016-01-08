import {
  REACTOR_WIDTH,
  REACTOR_HEIGHT,
} from './consts';

const REACTOR_X = (PAGE_WIDTH - REACTOR_WIDTH) / 2;
const REACTOR_Y = (PAGE_HEIGHT - REACTOR_HEIGHT) / 2;

export default class ElementBallClone {
  constructor(elementBall, area) {
    this.bitmap = elementBall.bitmap.clone();
    this.area = area;
    this.element = elementBall.element;

    this.bitmap.x = 60;
    this.bitmap.y = 0;

    const scale = 100 / elementBall.image.width;

    this.bitmap.scaleX = scale;
    this.bitmap.scaleY = scale;
    this.bitmap.rotation = 0;

    this.bitmap.on('mousedown', this.onPressStart, this);
    this.bitmap.on('pressmove', this.onPressMove, this);
    this.bitmap.on('pressup', this.onPressEnd, this);

    return this;
  }
  onPressStart() {
    this.originX = this.bitmap.x;
    this.originY = this.bitmap.y;
  }
  onPressMove(e) {
    this.bitmap.x = e.stageX / 2 - REACTOR_X;
    this.bitmap.y = e.stageY / 2 - REACTOR_Y;
  }
  onPressEnd(e) {
    if (this.isEnter(e.stageX / 2, e.stageY / 2)) {
      createjs.Tween.get(this.bitmap).to({
        x: this.originX,
        y: this.originY,
      }, 200, createjs.Ease.quintIn());
    } else {
      this.bitmap.parent.removeChild(this.bitmap);
      this.area.firstElement = null;
      this.area.firstOriginElement.bitmap.visible = true;
    }
  }
  isEnter(x, y) {
    return (
      REACTOR_X < x &&
      x < REACTOR_X + REACTOR_WIDTH &&
      REACTOR_Y < y &&
      y < REACTOR_Y + REACTOR_HEIGHT
    );
  }
}
