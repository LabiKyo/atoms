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
