export let line = [];
export let tempLine = { x: '', y: '', c: '', s: '' };
export default function sketch1(p) {
  var scale;
  var currentPath = [];
  var canvas;
  var isDrawing = false;

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
    if (newProps.sendLine) {
      p.sendLine = newProps.sendLine;
    }
    if (newProps.sendTempLine) {
      p.sendTempLine = newProps.sendTempLine;
    }
    if (newProps.line) {
      if (p.dataLine !== newProps.line) {
        if (p.dataLine) {
          if (p.dataLine.name !== newProps.line.name) {
            p.setup();
          }
        }
        p.dataLine = newProps.line;
        drawX();
      }
    }
    if (newProps.tempLine) {
      if (p.dataTempLine !== newProps.tempLine) {
        p.dataTempLine = newProps.tempLine;
        drawTempX();
      }
    }
    if (newProps.colorX) {
      p.colorX = p.color(`rgb(${newProps.colorX})`);
      p.rgb = newProps.colorX;
    }
    if (newProps.strokeX) {
      p.strokeX = newProps.strokeX;
    }
    if (newProps.newDraw) {
      if (p.newDraw !== newProps.newDraw) {
        p.newDraw = newProps.newDraw;

        p.setup();
      }
    }
    if (newProps.joined) {
      if (p.joined !== newProps.joined) {
        p.joined = newProps.joined;
        console.log('joined');
        setTimeout(function () {
          currentPath = { c: p.rgb, s: p.strokeX, points: [] };
          endPath();
        }, 100);
      }
    }
  };

  const drawTempX = () => {
    if (p.dataTempLine) {
      p.fill(p.color(`rgb(${p.dataTempLine.c})`));
      p.strokeWeight(p.dataTempLine.s);
      p.noStroke();
      p.ellipse(p.dataTempLine.x, p.dataTempLine.y, p.dataTempLine.s);
    }
  };

  const drawX = () => {
    if (p.dataLine) {
      for (var i = 0; i < p.dataLine.lines.length; i++) {
        var pathR = p.dataLine.lines[i];
        p.stroke(p.color(`rgb(${pathR.c})`));
        p.strokeWeight(pathR.s);
        p.noFill();
        p.beginShape();
        for (var j = 0; j < pathR.points.length; j++) {
          p.vertex(pathR.points[j].x, pathR.points[j].y);
        }
        p.endShape();
      }
    }
  };

  p.setup = function () {
    canvas = p.createCanvas(p.windowWidth - 100, p.windowHeight - 200);
    canvas.touchStarted(startPath);
    canvas.mousePressed(startPath);
    canvas.mouseReleased(endPath);
    canvas.touchEnded(endPath);
    p.setScale();
    p.background(0);
  };

  function startPath() {
    isDrawing = true;
    currentPath = { c: p.rgb, s: p.strokeX, points: [] };
  }

  function endPath() {
    isDrawing = false;
    p.sendLine((line = currentPath));
  }

  p.draw = function () {
    p.scale(scale);

    if (isDrawing) {
      var point = {
        x: p.mouseX / scale,
        y: p.mouseY / scale,
      };
      currentPath.points.push(point);
      p.sendTempLine(
        (tempLine = {
          x: p.mouseX / scale,
          y: p.mouseY / scale,
          c: p.rgb,
          s: p.strokeX,
        })
      );
    }

    if (
      isDrawing &&
      (p.mouseX < -10 ||
        p.mouseY < -10 ||
        p.mouseX > p.width + 10 ||
        p.mouseY > p.height + 10)
    ) {
      endPath();
    }
  };

  p.windowResized = function () {
    p.setScale();
    p.background(0);
    drawX();
  };
}
