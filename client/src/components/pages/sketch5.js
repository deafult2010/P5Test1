export default function sketch5(p) {
  let spritesheet;
  let spritedata;

  p.preload = function () {
    // spritedata = p.loadJSON('sprites/sitck.json');
    spritesheet = p.loadImage('./img/sprites/stick.png');
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
