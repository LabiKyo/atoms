function drawPage() {
  const page = new createjs.Container();
  const hitArea = new createjs.Shape();

  hitArea.graphics.beginFill('#000').rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT);
  page.hitArea = hitArea;

  page.addEventListener('click', () => {
    router.navigate('/selection');
  });

  stage.addChild(page);
}

export default function() {
  drawPage();
}
