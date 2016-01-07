function drawTitle(container) {
  const image = queue.getResult('logo');
  const logo = new createjs.Bitmap(image);

  logo.x = PAGE_WIDTH / 2;
  logo.y = PAGE_HEIGHT * 0.34;
  logo.scaleX = 1 / 3;
  logo.scaleY = 1 / 3;
  logo.regX = image.width / 2;
  logo.regY = image.height / 2;

  container.addChild(logo);
}

function drawPage() {
  const page = new createjs.Container();
  const hitArea = new createjs.Shape();

  hitArea.graphics.beginFill('#000').rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT);
  page.hitArea = hitArea;

  page.addEventListener('click', () => {
    router.navigate('/selection');
  });

  drawTitle(page);
  stage.addChild(page);
}

export default function() {
  drawPage();
}
