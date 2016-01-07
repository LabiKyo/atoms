import Grapnel from 'grapnel';

import FrontPage from './FrontPage';
import SelectionPage from './SelectionPage';
import IntroPage from './IntroPage';

function startRouter() {
  // window.router = new Grapnel({ pushState: true });
  window.router = new Grapnel();

  window.router.on('match', (event) => {
    window.debug('atoms:route')('[match] %s %s', event.value, JSON.stringify(event.req.params));
    stage.removeAllChildren();
  });

  window.router.get('/', FrontPage);

  window.router.get('/selection', SelectionPage);

  window.router.get('/intro/:element', IntroPage);
}

queue.on('complete', startRouter);
