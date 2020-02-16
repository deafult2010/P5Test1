export let timesClicked = 0;
export let data = [];
export let newDrawing = [];
export default function sketch(p) {
  p.myCustomRedrawAccordingToNewPropsHandler = function(newProps) {
    if (newProps.getCoords) {
      p.sendCoords = newProps.getCoords;
    }
    if (newProps.dataX) {
      p.dataX = newProps.dataX;
      console.log(p.dataX);
    }
    if (newProps.dataY) {
      p.dataY = newProps.dataY;
    }
  };

  p.setup = function() {
    p.createCanvas(300, 300);
    p.background(0);
    // p.fill(255);
    // p.ellipse(p.mouseX, p.mouseY, 100, 100);

    p.noStroke();
    p.fill(255, 0, 100);
    console.log(p.dataX);
    p.ellipse(p.dataX, p.dataY, 36, 36);
  };

  p.draw = function() {
    if (p.dataX && p.dataY) {
      p.noStroke();
      p.fill(255, 0, 100);
      p.ellipse(p.dataX, p.dataY, 36, 36);
    }
  };

  // p.myCustomRedrawAccordingToNewPropsHandler = function(newProps) {
  //   if (newProps.getCoords) {
  //     p.sendCoords = newProps.getCoords;
  //   }
  //   console.log(p.useCoords);
  //   if (newProps.recCoords) {
  //     p.useCoords = newProps.recCoords;
  //   }
  // };

  // p.mouseClicked = function() {
  //   p.sendCoords(p.mouseX, p.mouseY);
  //   timesClicked++;
  // };

  p.mouseDragged = function() {
    // console.log('Sending: ' + p.mouseX + ',' + p.mouseY);

    p.sendCoords(
      (data = {
        x: p.mouseX,
        y: p.mouseY
      })
    );

    p.noStroke();
    p.fill(255);
    p.ellipse(p.mouseX, p.mouseY, 36, 36);
  };
}
