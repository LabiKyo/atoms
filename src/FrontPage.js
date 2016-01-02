import { PAGE_WIDTH, PAGE_HEIGHT } from './consts';

function drawTitle(container) {
  const title = new createjs.Text('Atoms+', '120px Arial', '#000000');

  title.x = PAGE_WIDTH / 2;
  title.y = PAGE_HEIGHT / 2;
  title.regX = title.getMeasuredWidth() / 2;
  title.regY = title.getMeasuredHeight() / 2;

  container.addChild(title);
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
