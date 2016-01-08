import Shake from 'shake.js';

import ElementBall from './ElementBall';
import elements from './elements';

class SelectionPage {
  constructor() {
    this.page = new createjs.Container();
    this.ballContainer = new createjs.Container();

    this.drawReactor();
    this.drawElementBalls();
    this.setupShake();

    this.page.addChild(this.ballContainer);
    stage.addChild(this.page);
  }
  setupShake() {
    this.shake = new Shake({
      threshold: 8,
      timeout: 1000,
    });
    this.shake.start();
    window.addEventListener('shake', () => {
      this.drawElementBalls();
    }, false);
  }
  drawReactor() {
    const image = queue.getResult('plus');
    const reactor = new createjs.Bitmap(image);

    reactor.x = PAGE_WIDTH / 2;
    reactor.y = PAGE_HEIGHT / 2;
    reactor.scaleX = 0;
    reactor.scaleY = 0;
    reactor.alpha = 0;
    reactor.regX = image.width / 2;
    reactor.regY = image.height / 2;

    this.page.addChild(reactor);

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
  drawElementBalls() {
    this.ballContainer.removeAllChildren();
    elements.reverse().forEach((element) => {
      const ball = new ElementBall(queue.getResult(`element-ball-${element}`));

      ball.on('click', () => {
        router.navigate(`/intro/${element}`);
      });

      this.ballContainer.addChild(ball);
    });
  }
}

export default function() {
  return new SelectionPage();
}
