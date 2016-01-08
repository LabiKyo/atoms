import {
  REACTOR_WIDTH,
  REACTOR_HEIGHT,
} from './consts';
import ElementBallClone from './ElementBallClone';
import reactions from './reactions';

const REACTOR_X = (PAGE_WIDTH - REACTOR_WIDTH) / 2;
const REACTOR_Y = (PAGE_HEIGHT - REACTOR_HEIGHT) / 2;

export default class ReactionArea {
  constructor() {
    this.container = new createjs.Container();
    this.container.x = (PAGE_WIDTH - REACTOR_WIDTH) / 2;
    this.container.y = (PAGE_HEIGHT - REACTOR_HEIGHT) / 2;

    this.drawHoverShape();
    this.drawRightShape();
    this.drawWrongShape();

    this.hoverShape.visible = false;
    this.rightShape.visible = false;
    this.wrongShape.visible = false;

    this.firstElement = null;

    stage.on('mousedown', () => {
      this.setState('hover');
    });
    stage.on('pressmove', (e) => {
      const x = e.stageX / window.devicePixelRatio;
      const y = e.stageY / window.devicePixelRatio;

      if (this.isEnter(x, y)) {
        if (this.firstElement) {
          if (
            reactions[this.firstElement.element] &&
            reactions[this.firstElement.element].indexOf(draggingElement.element) !== -1
          ) {
            this.setState('right');
          } else {
            this.setState('wrong');
          }
        } else {
          this.setState('right');
        }
      } else {
        this.setState('hover');
      }
    });
    stage.on('pressup', (e) => {
      const x = e.stageX / window.devicePixelRatio;
      const y = e.stageY / window.devicePixelRatio;

      this.setState('');

      if (this.isEnter(x, y)) {
        if (!this.firstElement) {
          this.firstElement = new ElementBallClone(draggingElement, this);
          this.firstOriginElement = draggingElement;
          this.firstOriginElement.bitmap.visible = false;
          this.firstElement.bitmap.y = 65;
          this.container.addChild(this.firstElement.bitmap);
        } else if (
          reactions[this.firstElement.element] &&
          reactions[this.firstElement.element].indexOf(draggingElement.element) !== -1
        ) {
          this.secondElement = new ElementBallClone(draggingElement, this);
          this.secondOriginElement = draggingElement;
          this.secondOriginElement.bitmap.visible = false;
          this.secondElement.bitmap.y = 214;
          this.container.addChild(this.secondElement.bitmap);

          const e1 = this.firstElement.element;
          const e2 = this.secondElement.element;
          let result = queue.getResult(`video-${e1}+${e2}`);

          if (result) {
            router.navigate(`/reaction/${e1}+${e2}`);
          } else {
            router.navigate(`/reaction/${e2}+${e1}`);
          }
        }
      }
    });

    return this;
  }
  drawHoverShape() {
    this.hoverShape = new createjs.Shape();

    this.hoverShape.graphics
      .setStrokeDash([ 10, 4 ])
      .setStrokeStyle(4)
      .beginStroke('#eeeeee')
      .drawRoundRect(0, 0, REACTOR_WIDTH, REACTOR_HEIGHT, 4);

    this.container.addChild(this.hoverShape);
  }
  drawRightShape() {
    this.rightShape = new createjs.Shape();

    this.rightShape.graphics
      .setStrokeDash([ 10, 4 ])
      .setStrokeStyle(4)
      .beginStroke('green')
      .drawRoundRect(0, 0, REACTOR_WIDTH, REACTOR_HEIGHT, 4);

    this.container.addChild(this.rightShape);
  }
  drawWrongShape() {
    this.wrongShape = new createjs.Shape();

    this.wrongShape.graphics
      .setStrokeDash([ 10, 4 ])
      .setStrokeStyle(4)
      .beginStroke('red')
      .drawRoundRect(0, 0, REACTOR_WIDTH, REACTOR_HEIGHT, 4);

    this.container.addChild(this.wrongShape);
  }
  setState(state) {
    [ 'hover', 'right', 'wrong' ].forEach((s) => {
      this[`${s}Shape`].visible = state === s;
    });
  }

  // helpers
  isEnter(x, y) {
    return (
      REACTOR_X < x &&
      x < REACTOR_X + REACTOR_WIDTH &&
      REACTOR_Y < y &&
      y < REACTOR_Y + REACTOR_HEIGHT
    );
  }
}
