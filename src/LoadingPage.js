function drawLogo() {
  const logo = new createjs.Bitmap(require('./images/logo.png'));

  logo.x = PAGE_WIDTH / 2;
  logo.y = PAGE_HEIGHT * 0.34;
  logo.scaleX = 1 / 3;
  logo.scaleY = 1 / 3;
  logo.regX = 363 / 2;
  logo.regY = 108 / 2;

  stage.addChild(logo);
}

function drawLoading() {
  const text = new createjs.Text('Loading...', '14px Arial');

  text.x = PAGE_WIDTH / 2;
  text.y = PAGE_HEIGHT * 0.67;
  text.regX = text.getMeasuredWidth() / 2;
  text.regY = text.getMeasuredHeight() / 2;

  const progressBar = new createjs.Shape();

  progressBar.graphics
    .beginStroke('#000000')
    .drawRect(0, 0, PAGE_WIDTH * 0.67, 4)
    .beginFill('#000000');
  progressBar.x = PAGE_WIDTH * 0.165;
  progressBar.y = PAGE_HEIGHT * 0.72;

  stage.addChild(text, progressBar);

  return progressBar;
}

export default function() {
  const d = window.debug('atoms:queue');

  drawLogo();
  const progressBar = drawLoading();

  queue.on('progress', (e) => {
    d('[progress] %s%%', (e.loaded * 100).toFixed(0));
    progressBar.graphics
      .drawRect(0, 0, PAGE_WIDTH * 0.67 * e.loaded, 4);
  });

  queue.on('complete', () => {
    const config = new createjs.PlayPropsConfig().set({
      loop: -1,
    });

    createjs.Sound.play('bgm', config);
  });
}
