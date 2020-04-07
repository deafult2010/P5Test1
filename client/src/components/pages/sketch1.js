export let timesClicked = 0;
export let data = [];
export let newDrawing = [];
export default function sketch1(p) {
  var scale;

  p.setScale = function () {
    if (window.innerWidth < 280 || window.innerHeight < 330) {
      p.resizeCanvas(160, 160);
      scale = 1;
    } else if (window.innerWidth < 320 || window.innerHeight < 390) {
      p.resizeCanvas(210, 210);
      scale = 1.3;
    } else if (window.innerWidth < 410 || window.innerHeight < 470) {
      p.resizeCanvas(270, 270);
      scale = 1.7;
    } else if (window.innerWidth < 550 || window.innerHeight < 600) {
      p.resizeCanvas(350, 350);
      scale = 2.2;
    } else if (window.innerWidth < 700 || window.innerHeight < 770) {
      p.resizeCanvas(480, 480);
      scale = 3;
    } else if (window.innerWidth < 850 || window.innerHeight < 920) {
      p.resizeCanvas(640, 640);
      scale = 4;
    } else {
      p.resizeCanvas(800, 800);
      scale = 5;
    }
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (newProps) {
    if (newProps.getCoords) {
      p.sendCoords = newProps.getCoords;
    }
    if (newProps.dataX) {
      p.dataX = newProps.dataX;
    }
    if (newProps.dataY) {
      p.dataY = newProps.dataY;
    }
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth - 100, p.windowHeight - 200);
    p.setScale();
    p.background(0);
  };

  p.draw = function () {
    p.scale(scale);
    if (p.dataX && p.dataY) {
      p.noStroke();
      p.fill(255, 0, 100);
      p.ellipse(p.dataX, p.dataY, 20, 20);
    }
  };

  p.windowResized = function () {
    p.setScale();
    p.background(0);
  };

  p.mouseDragged = function () {
    if (
      p.mouseX > -10 &&
      p.mouseY > -10 &&
      p.mouseX < p.width + 10 &&
      p.mouseY < p.height + 10
    ) {
      p.sendCoords(
        (data = {
          x: p.mouseX / scale,
          y: p.mouseY / scale,
        })
      );
      p.noStroke();
      p.fill(255);
      p.ellipse(p.mouseX / scale, p.mouseY / scale, 20, 20);
    }
  };
}
