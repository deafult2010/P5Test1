import 'p5/lib/p5.js';
// import * as p5 from 'p5/lib/p5.js';

export default function sketch5(p) {
  // Images
  // Directory paths (passed in as props due to file hashing)
  let UIImage;
  let UIImageX;

  // Allow for resizing
  let scale;
  let devOrient;
  let prevDevOrient;

  // functions

  // orientation
  p.orientation = function () {
    devOrient =
      window.innerWidth / window.innerHeight > 1.0 ? 'landscape' : 'portrait';
    if (devOrient !== prevDevOrient) {
      p.setScale();
      prevDevOrient = devOrient;
    }
  };
  p.windowResized = function () {
    p.setScale();
  };
  p.setScale = function () {
    scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    p.resizeCanvas(scale * 400, scale * 520);
  };

  // props
  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.UIImage) {
      if (UIImage != props.UIImage) {
        UIImage = props.UIImage;
        UIImageX = p.loadImage(UIImage);
      }
    }
  };

  p.setup = function () {
    p.createCanvas(400, 520);
    p.canvas.oncontextmenu = function (e) {
      e.preventDefault();
    };
  };

  p.draw = function () {
    p.setScale();
    p.scale(scale);
    p.background(0);
    if (UIImageX) {
      p.image(UIImageX, 0, 0);
    }
  };
}
