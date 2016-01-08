function drawPage(reaction) {
  createjs.Sound.stop();
  const page = new createjs.Container();

  const videoElement = document.createElement('video');
  const sourceElement = document.createElement('source');

  sourceElement.src = require(`./videos/${reaction}.mp4`);
  videoElement.preload = 'auto';
  videoElement.autoplay = 'true';
  videoElement.style.cssText = 'width: 100%; position: absolute; top: 0; z-index: 100';
  videoElement.appendChild(sourceElement);

  document.body.appendChild(videoElement);

  videoElement.addEventListener('ended', () => {
    const config = new createjs.PlayPropsConfig().set({
      loop: -1,
    });

    createjs.Sound.play('bgm', config);
    router.navigate('/selection');
    document.body.removeChild(videoElement);
  });

  // const video = new createjs.DOMElement(videoElement);

  // video.scaleX = PAGE_WIDTH / 750;
  // video.scaleY = PAGE_HEIGHT / 1334;

  // page.addChild(video);

  stage.addChild(page);
}

export default function(req) {
  drawPage(req.params.reaction);
}
