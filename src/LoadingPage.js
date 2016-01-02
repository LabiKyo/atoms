import { PAGE_WIDTH, PAGE_HEIGHT } from './consts';

export default function() {
  const d = window.debug('atoms:queue');
  const text = new createjs.Text('Loading...(0%)', '120px Arial');

  text.x = PAGE_WIDTH / 2;
  text.y = PAGE_HEIGHT / 2;
  text.regX = text.getMeasuredWidth() / 2;
  text.regY = text.getMeasuredHeight() / 2;

  queue.on('progress', (e) => {
    d('[progress] %s%%', (e.loaded * 100).toFixed(0));
    text.text = `Loading...(${(e.loaded * 100).toFixed(0)}%)`;
  });

  stage.addChild(text);
}
