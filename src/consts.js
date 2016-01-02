const PAGE_WIDTH = 1242;
const PAGE_HEIGHT = 2208;
const REACTOR_WIDTH = 400;
const REACTOR_HEIGHT = 800;
const REACTOR_X = (PAGE_WIDTH - REACTOR_WIDTH) / 2;
const REACTOR_Y = (PAGE_HEIGHT - REACTOR_HEIGHT) / 2;
const SPEED_FACTOR = 10;
const ROTATION_SPEED_FACTOR = 2;

require('debug')('atoms:const')(
  '[REACTOR] x: %s, x+w: %s, y: %s, y+h: %s',
  REACTOR_X,
  REACTOR_X + REACTOR_WIDTH,
  REACTOR_Y,
  REACTOR_Y + REACTOR_HEIGHT
);

export default {
  PAGE_WIDTH,
  PAGE_HEIGHT,
  REACTOR_WIDTH,
  REACTOR_HEIGHT,
  REACTOR_X,
  REACTOR_Y,
  SPEED_FACTOR,
  ROTATION_SPEED_FACTOR,
};
