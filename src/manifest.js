import elements from './elements';

const manifest = [
  {
    id: 'plus',
    src: require('./images/plus.png'),
  },
];

elements.forEach((element) => {
  manifest.push({
    id: `element-ball-${element}`,
    src: require(`./images/element-balls/${element}.png`),
  });
});
export default manifest;
