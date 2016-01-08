import Grapnel from 'grapnel';

import FrontPage from './FrontPage';
import SelectionPage from './SelectionPage';
import IntroPage from './IntroPage';
import ReactionPage from './ReactionPage';

function startRouter() {
  // window.router = new Grapnel({ pushState: true });
  window.router = new Grapnel();

  router.on('match', (event) => {
    window.debug('atoms:route')('[match] %s %s', event.value, JSON.stringify(event.req.params));
    stage.removeAllChildren();
  });

  router.get('/', FrontPage);

  router.get('/selection', SelectionPage);

  router.get('/intro/:element', IntroPage);

  router.get('/reaction/:reaction', ReactionPage);
}

queue.on('complete', startRouter);
