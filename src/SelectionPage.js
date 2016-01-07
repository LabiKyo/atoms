import ElementBall from './ElementBall';
import elements from './elements';

function drawReactor(container) {
  const image = queue.getResult('plus');
  const reactor = new createjs.Bitmap(image);

  reactor.x = PAGE_WIDTH / 2;
  reactor.y = PAGE_HEIGHT / 2;
  reactor.scaleX = 0;
  reactor.scaleY = 0;
  reactor.alpha = 0;
  reactor.regX = image.width / 2;
  reactor.regY = image.height / 2;

  container.addChild(reactor);

  createjs.Tween.get(reactor).to({
    scaleX: 1 / 3,
    scaleY: 1 / 3,
    alpha: 1,
  }, 800, createjs.Ease.quintIn())
  .call(() => {
    createjs.Tween.get(reactor, { loop: true })
      .to({
        scaleX: 7 / 24,
        scaleY: 7 / 24,
      }, 800, createjs.Ease.quintOut())
      .to({
        scaleX: 1 / 3,
        scaleY: 1 / 3,
      }, 800, createjs.Ease.quintIn());
  });
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
  const ballContainer = new createjs.Container();

  drawReactor(page);
  drawElementBalls(ballContainer);
  page.addChild(ballContainer);

  stage.addChild(page);
}

export default function() {
  drawPage();
}
