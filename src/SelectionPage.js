import { PAGE_WIDTH, PAGE_HEIGHT } from './consts';

import image from './images/plus.png';
const IMAGE_WIDTH = 111;
const IMAGE_HEIGHT = 108;

function drawReactor() {
  const reactor = new createjs.Bitmap(image);

  reactor.x = PAGE_WIDTH / 2;
  reactor.y = PAGE_HEIGHT / 2;
  reactor.regX = IMAGE_WIDTH / 2;
  reactor.regY = IMAGE_HEIGHT / 2;

  stage.addChild(reactor);
}

export default function() {
  drawReactor();
}
