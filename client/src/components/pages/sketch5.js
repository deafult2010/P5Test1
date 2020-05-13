export default function sketch5(p) {
  let spritesheet;
  let spritedata;
  let image;

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.image) {
      image = props.image;
    }
  };

  p.preload = function () {
    // spritedata = p.loadJSON('sprites/sitck.json');
    spritesheet = p.loadImage(image, 0, 0);
  };

  p.setup = function () {
    p.createCanvas(400, 400);
    // console.log(spritedata);
  };

  p.draw = function () {
    p.background(0);
    p.image(spritesheet, 0, 0);
  };
}
