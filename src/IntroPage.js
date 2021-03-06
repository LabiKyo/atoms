import Slider from './Slider';
import { INTRO_PAGE_SEP_MARGIN, INTRO_PAGE_BODY_HEIGHT } from './consts';

function positionMapping(part) {
  const mapping = {
    header: 20,
    footer: PAGE_HEIGHT - INTRO_PAGE_SEP_MARGIN,
    body: (PAGE_HEIGHT - INTRO_PAGE_BODY_HEIGHT) / 2,
    second: (PAGE_HEIGHT - INTRO_PAGE_BODY_HEIGHT) / 2,
  };

  return mapping[part];
}

function addBitmap(part, element) {
  const ratio = Math.min(1, PAGE_WIDTH / 375) / 3;
  const image = queue.getResult(`intro-${part}-${element}`);
  const bitmap = new createjs.Bitmap(image);

  bitmap.x = (PAGE_WIDTH - image.width * ratio) / 2;
  bitmap.y = positionMapping(part);
  bitmap.scaleX = ratio;
  bitmap.scaleY = ratio;

  return bitmap;
}

function drawSeperator(container) {
  const seperator = new createjs.Shape();

  seperator.graphics
    .setStrokeStyle(8)
    .beginStroke('rgba(151, 151, 151, 0.3)')
    .drawRect(
      -28,
      INTRO_PAGE_SEP_MARGIN,
      600,
      PAGE_HEIGHT - INTRO_PAGE_SEP_MARGIN - INTRO_PAGE_SEP_MARGIN - 16
    );
  container.addChild(seperator);
}

function drawBackButton(container) {
  const btn = new createjs.Container();
  const hitArea = new createjs.Shape();

  hitArea.graphics.beginFill('white').drawRect(25, PAGE_HEIGHT - 77, 60, 60);
  btn.hitArea = hitArea;
  btn.on('click', () => {
    router.navigate('/selection');
  });

  container.addChild(btn);
}

function drawSlider(element, container) {
  const spritesheet = new createjs.SpriteSheet({
    images: [queue.getResult(`intro-spritesheet-${element}`)],
    frames: {
      width: 400,
      height: 400,
      regX: 200,
      regY: 200,
    },
  });
  const sprite = new createjs.Sprite(spritesheet);

  sprite.x = PAGE_WIDTH / 2;
  sprite.y = PAGE_HEIGHT / 2;
  sprite.play();

  const secondPage = new createjs.Container();

  secondPage.addChild(sprite, addBitmap('second', element));

  const slider = new Slider([
    addBitmap('body', element),
    secondPage,
  ]);

  container.addChild(slider);
}

function drawPage(element) {
  const page = new createjs.Container();

  page.addChild(addBitmap('header', element));
  page.addChild(addBitmap('footer', element));

  drawSeperator(page);
  drawBackButton(page);
  drawSlider(element, page);

  stage.addChild(page);
}

export default function(req) {
  drawPage(req.params.element);
}
