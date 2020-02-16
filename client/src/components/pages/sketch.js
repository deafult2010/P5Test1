export let timesClicked = 0;
export let data = [];
export default function sketch(p) {
  p.setup = function() {
    p.createCanvas(300, 300);
  };

  p.draw = function() {
    p.background(0);
    p.fill(255);
    p.ellipse(p.mouseX, p.mouseY, 100, 100);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(newProps) {
    if (newProps.getCoords) {
      p.sendCoords = newProps.getCoords;
    }
  };

  // p.mouseClicked = function() {
  //   p.sendCoords(p.mouseX, p.mouseY);
  //   timesClicked++;
  // };

  p.mouseDragged = function() {
    console.log('Sending: ' + p.mouseX + ',' + p.mouseY);

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
