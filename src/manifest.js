import elements from './elements';

let manifest = [
  {
    id: 'plus',
    src: require('./images/plus.png'),
  },
  {
    id: 'bgm',
    src: require('./bgm.mp3'),
  },
  {
    id: 'logo-spritesheet',
    src: require('./images/logo-spritesheet.png'),
  },
];

// preload element balls
elements.forEach((element) => {
  manifest.push({
    id: `element-ball-${element}`,
    src: require(`./images/element-balls/${element}.png`),
  });
});

// preload element intro page
elements.forEach((element) => {
  const parts = [ 'header', 'footer', 'body', 'second', 'spritesheet' ].map((part) => {
    return {
      id: `intro-${part}-${element}`,
      src: require(`./images/intro/${part}-${element}.png`),
    };
  });

  manifest = manifest.concat(parts);
});

[
  'h+o',
  // 'h+f',
  // 'b+cl',
  // 'al+cl',
].forEach((reaction) => {
  manifest.push({
    id: `video-${reaction}`,
    src: require(`./videos/${reaction}.mp4`),
    type: createjs.AbstractLoader.VIDEO,
  });
});

export default manifest;
