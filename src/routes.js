import Grapnel from 'grapnel';

import FrontPage from './FrontPage';
import SelectionPage from './SelectionPage';

// window.router = new Grapnel({ pushState: true });
window.router = new Grapnel();

router.on('match', (e) => {
  console.log('[Router match]', e.route);
  stage.removeAllChildren();
});

router.get('/', FrontPage);

router.get('/selection', SelectionPage);
