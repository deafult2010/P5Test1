import 'p5/lib/p5.js';
// import * as p5 from 'p5/lib/p5.js';

export default function sketch5(p) {
  // Images
  // Directory paths (passed in as props due to file hashing)
  let keysImage;
  let leftImage;
  let altImage;
  let keysImageX;
  let leftImageX;
  let altImageX;

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
    p.resizeCanvas(scale * 200, scale * 200);
  };

  // props
  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.keysImage) {
      if (keysImage != props.keysImage) {
        keysImage = props.keysImage;
        keysImageX = p.loadImage(keysImage);
      }
    }
    if (props.leftImage) {
      if (leftImage != props.leftImage) {
        leftImage = props.leftImage;
        leftImageX = p.loadImage(leftImage);
      }
    }
    if (props.altImage) {
      if (altImage != props.altImage) {
        altImage = props.altImage;
        altImageX = p.loadImage(altImage);
      }
    }
  };

  p.setup = function () {
    p.createCanvas(200, 200);
    p.canvas.oncontextmenu = function (e) {
      e.preventDefault();
    };
  };

  p.draw = function () {
    p.setScale();
    p.scale(scale);
    p.background(0);
    if (keysImageX) {
      p.image(keysImageX, 0, 0);
    }
    if (leftImageX) {
      p.image(leftImageX, 0, 0);
    }
    if (altImageX) {
      p.image(altImageX, 0, 0);
    }
  };
}
