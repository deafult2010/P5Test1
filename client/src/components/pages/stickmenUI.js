import 'p5/lib/p5.js';
// import * as p5 from 'p5/lib/p5.js';

export default function sketch5(p) {
  // props
  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {};

  p.setup = function () {
    p.createCanvas(400, 400);
    p.canvas.oncontextmenu = function (e) {
      e.preventDefault();
    };
    p.setScale();
  };

  p.draw = function () {
    p.background(0);
  };
}
