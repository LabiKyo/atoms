import Grapnel from 'grapnel';

import FrontPage from './FrontPage';
import SelectionPage from './SelectionPage';

function startRouter() {
  // window.router = new Grapnel({ pushState: true });
  window.router = new Grapnel();

  window.router.on('match', (event) => {
    window.debug('atoms:route')('[match]', event.route);
    stage.removeAllChildren();
  });

  window.router.get('/', FrontPage);

  window.router.get('/selection', SelectionPage);
}

queue.on('complete', startRouter);
