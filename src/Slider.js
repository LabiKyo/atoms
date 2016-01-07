import Indicator from './Indicator';
import { INTRO_PAGE_SEP_MARGIN, INTRO_PAGE_BODY_HEIGHT } from './consts';

export default class Slider {
  constructor(children = []) {
    this.container = new createjs.Container();
    this.children = children;
    this.size = children.length;
    this.active = 0;

    children.forEach((child, index) => {
      child.x = index * PAGE_WIDTH + child.x;
      this.container.addChild(child);
    });

    this.drawIndicator();

    return this.container;
  }
  drawIndicator() {
    this.indicators = new createjs.Container();

    const marginLeft = (PAGE_WIDTH - this.size * 20) / 2;

    this.children.forEach((child, index) => {
      const indicator = new Indicator(index === this.active);

      indicator.x = marginLeft + index * 20;

      this.indicators.addChild(indicator);
    });

    this.indicators.x = 0;
    this.indicators.y = PAGE_HEIGHT - INTRO_PAGE_SEP_MARGIN - 34;

    this.container.addChild(this.indicators);
  }
}
