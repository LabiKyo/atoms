function navigateToSelection() {
  router.navigate('/selection');
}

function drawPage() {
  const page = new createjs.Container();

  const spritesheet = new createjs.SpriteSheet({
    images: [queue.getResult('logo-spritesheet')],
    frames: {
      width: 200,
      height: 300,
      regX: 100,
      regY: 150,
    },
  });
  const sprite = new createjs.Sprite(spritesheet);

  sprite.x = PAGE_WIDTH / 2;
  sprite.y = PAGE_HEIGHT * 0.33;

  page.addChild(sprite);
  sprite.play();
  sprite.on('animationend', () => {
    sprite.gotoAndStop(63);
    setTimeout(() => {
      createjs.Tween.get(sprite).to({
        alpha: 0,
      }, 800, createjs.Ease.quintOut())
      .call(navigateToSelection);
    }, 1000);
  });

  stage.addChild(page);
}

export default function() {
  drawPage();
}
