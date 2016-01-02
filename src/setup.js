// setup debug
window.debug = require('debug');
// to enable debug output in browser,
// run `debug.enable('atoms:*')`

// setup stage
window.stage = new createjs.Stage('main');

// setup ticker
createjs.Ticker.setFPS(24);
createjs.Ticker.addEventListener('tick', stage);

// setup touch
createjs.Touch.enable(stage);

// setup preload
import LoadingPage from './LoadingPage';

window.queue = new createjs.LoadQueue();
queue.installPlugin(createjs.Sound);
LoadingPage();
queue.loadManifest(require('./manifest'));
