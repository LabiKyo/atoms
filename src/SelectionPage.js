import { REACTOR_WIDTH, REACTOR_HEIGHT } from './consts';
import ElementBall from './ElementBall';
import elements from './elements';

function drawReactor(container) {
  const image = queue.getResult('plus');
  const reactor = new createjs.Bitmap(image);

  reactor.x = PAGE_WIDTH / 2;
  reactor.y = PAGE_HEIGHT / 2;
  reactor.scaleX = 1 / 3;
  reactor.scaleY = 1 / 3;
  reactor.regX = image.width / 2;
  reactor.regY = image.height / 2;

  container.addChild(reactor);
}

function drawDropArea(container) {
  const area = new createjs.Shape();
  const x = (PAGE_WIDTH - REACTOR_WIDTH) / 2;
  const y = (PAGE_HEIGHT - REACTOR_HEIGHT) / 2;

  area.graphics
    .beginFill('#eeeeee')
    .drawRect(x, y, REACTOR_WIDTH, REACTOR_HEIGHT);

  container.addChild(area);
}

function drawElementBalls(container) {
  elements.reverse().forEach((element) => {
    const ball = new ElementBall(queue.getResult(`element-ball-${element}`));

    ball.on('click', () => {
      router.navigate(`/intro/${element}`);
    });

    container.addChild(ball);
  });
}

function drawPage() {
  const page = new createjs.Container();

  // drawDropArea(page);
  drawReactor(page);
  drawElementBalls(page);

  stage.addChild(page);
}

export default function() {
  drawPage();
}
