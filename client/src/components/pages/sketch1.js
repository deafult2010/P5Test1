export let timesClicked = 0;
export let data = [];
export let newDrawing = [];
export default function sketch1(p) {
  var scale;

  p.setScale = function() {
    if (window.innerWidth < 400 || window.innerHeight < 480) {
      p.resizeCanvas(160, 160);
      scale = 1;
    } else if (window.innerWidth < 550 || window.innerHeight < 640) {
      p.resizeCanvas(320, 320);
      scale = 2;
    } else if (window.innerWidth < 700 || window.innerHeight < 800) {
      p.resizeCanvas(480, 480);
      scale = 3;
    } else if (window.innerWidth < 850 || window.innerHeight < 950) {
      p.resizeCanvas(640, 640);
      scale = 4;
    } else {
      p.resizeCanvas(800, 800);
      scale = 5;
    }
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(newProps) {
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

  p.setup = function() {
    p.createCanvas(p.windowWidth - 100, p.windowHeight - 200);
    p.setScale();
    p.background(0);
  };

  p.draw = function() {
    p.scale(scale);
    if (p.dataX && p.dataY) {
      p.noStroke();
      p.fill(255, 0, 100);
      p.ellipse(p.dataX, p.dataY, 20, 20);
    }
  };

  p.windowResized = function() {
    p.setScale();
    p.background(0);
  };

  p.mouseDragged = function() {
    p.sendCoords(
      (data = {
        x: p.mouseX / scale,
        y: p.mouseY / scale
      })
    );

    p.noStroke();
    p.fill(255);
    p.ellipse(p.mouseX / scale, p.mouseY / scale, 20, 20);
  };
}
