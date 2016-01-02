// setup stage
window.stage = new createjs.Stage('main');

// setup ticker
createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener('tick', stage);

// setup touch
createjs.Touch.enable(stage);
