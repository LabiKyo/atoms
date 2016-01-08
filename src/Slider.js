import Indicator from './Indicator';
import { INTRO_PAGE_SEP_MARGIN } from './consts';

export default class Slider {
  constructor(children = []) {
    this.container = new createjs.Container();
    this.pages = new createjs.Container();
    this.size = children.length;
    this.active = 0;

    children.forEach((child, index) => {
      child.x = index * PAGE_WIDTH + child.x;
      this.pages.addChild(child);
    });

    this.drawIndicator();
    this.drawHitArea();

    this.container.addChild(this.pages);
    this.container.on('mousedown', this.onPressStart, this);
    this.container.on('pressmove', this.onPressMove, this);
    this.container.on('pressup', this.onPressEnd, this);

    return this.container;
  }
  drawIndicator() {
    this.indicators = [];
    this.indicatorContainer = new createjs.Container();

    const marginLeft = (PAGE_WIDTH - this.size * 20) / 2;

    for (let i = 0; i < this.size; i += 1) {
      const indicator = new Indicator(i === this.active);

      indicator.circle.x = marginLeft + i * 20;
      this.indicatorContainer.addChild(indicator.circle);
      this.indicators.push(indicator);
    }

    this.indicatorContainer.x = 0;
    this.indicatorContainer.y = PAGE_HEIGHT - INTRO_PAGE_SEP_MARGIN - 34;

    this.container.addChild(this.indicatorContainer);
  }
  drawHitArea() {
    const shape = new createjs.Shape();

    shape.graphics
      .beginFill('grey')
      .drawRect(
        0,
        INTRO_PAGE_SEP_MARGIN,
        PAGE_WIDTH,
        PAGE_HEIGHT - INTRO_PAGE_SEP_MARGIN * 2
      );

    this.container.hitArea = shape;
  }

  // handlers
  onPressStart(e) {
    this.startX = e.stageX;
    this.startTime = e.timeStamp;
  }
  onPressMove(e) {
    const distance = (e.stageX - this.startX) / window.devicePixelRatio;

    if (this.isDistanceValid(distance)) {
      this.pages.x = -this.active * PAGE_WIDTH + distance;
    }
  }
  onPressEnd(e) {
    const distance = (e.stageX - this.startX) / window.devicePixelRatio;
    const time = (e.timeStamp - this.startTime) / 1000;
    const speed = distance / time;

    if (this.isDistanceValid(distance)) {
      if (distance < -PAGE_WIDTH / 2 || speed < -PAGE_WIDTH / 1.5) {
        this.toggleIndicators([ this.active, this.active + 1 ]);
        this.active += 1;
      }
      if (distance > PAGE_WIDTH / 2 || speed > PAGE_WIDTH / 1.5) {
        this.toggleIndicators([ this.active, this.active - 1 ]);
        this.active -= 1;
      }
    }

    createjs.Tween.get(this.pages)
      .to(
        { x: -this.active * PAGE_WIDTH },
        200,
        createjs.Ease.circOut()
      );
  }

  // helpers
  isDistanceValid(distance) {
    if (this.active === 0 && distance > 0) {
      return false;
    }
    if (this.active === this.size - 1 && distance < 0) {
      return false;
    }
    return true;
  }
  toggleIndicators(indexes = []) {
    indexes.forEach((index) => {
      this.indicators[index].toggleActive();
    });
  }
}
