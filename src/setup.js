// setup debug
window.debug = require('debug');
// to enable debug output in browser,
// run `debug.enable('atoms:*')`

// setup retina
const body = document.body;
const rect = body.getBoundingClientRect();
const { width, height } = rect;
const canvas = document.getElementById('main');

window.PAGE_WIDTH = width;
window.PAGE_HEIGHT = height;

canvas.width = width * window.devicePixelRatio;
canvas.height = height * window.devicePixelRatio;
canvas.style.width = width + 'px';
canvas.style.height = height + 'px';

// setup stage
window.stage = new createjs.Stage('main');
stage.scaleX = window.devicePixelRatio;
stage.scaleY = window.devicePixelRatio;

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
