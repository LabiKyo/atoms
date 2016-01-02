import {
  PAGE_WIDTH,
  PAGE_HEIGHT,
  REACTOR_WIDTH,
  REACTOR_HEIGHT,
  REACTOR_X,
  REACTOR_Y,
} from './consts';
import ElementBall from './ElementBall';
import elements from './elements';

function drawReactor(container) {
  const image = queue.getResult('plus');
  const reactor = new createjs.Bitmap(image);

  reactor.x = PAGE_WIDTH / 2;
  reactor.y = PAGE_HEIGHT / 2;
  reactor.regX = image.width / 2;
  reactor.regY = image.height / 2;

  container.addChild(reactor);
}

function drawDropArea(container) {
  const area = new createjs.Shape();

  area.graphics
    .beginFill('#eeeeee')
    .drawRect(REACTOR_X, REACTOR_Y, REACTOR_WIDTH, REACTOR_HEIGHT);

  container.addChild(area);
}

function drawElementBalls(container) {
  elements.forEach((element) => {
    const ball = new ElementBall(queue.getResult(`element-ball-${element}`));

    container.addChild(ball);
  });
}

function drawPage() {
  const page = new createjs.Container();

  drawDropArea(page);
  drawReactor(page);
  drawElementBalls(page);

  stage.addChild(page);
  stage.update();
}

export default function() {
  drawPage();
}
