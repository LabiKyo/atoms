import elements from './elements';

let manifest = [
  {
    id: 'plus',
    src: require('./images/plus.png'),
  },
  {
    id: 'logo',
    src: require('./images/logo.png'),
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
['h', 'he'].forEach((element) => {
  const parts = [ 'header', 'footer', 'body', 'second', 'spritesheet' ].map((part) => {
    return {
      id: `intro-${part}-${element}`,
      src: require(`./images/intro/${part}-${element}.png`)
    };
  });
  manifest = manifest.concat(parts);
});

export default manifest;
