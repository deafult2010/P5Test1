// ------------exp(y)---------------
// var s = new odex.Solver(2);
// var eq = function (x, y) {
//   return [y[1], -y[0]];
// };
// // This is y'' = -y, y(0) = 1, y'(0) = 0, e.g. cos(x)
// s.solve(eq, 0, [1, 0], Math.PI);
// // We observe that at x = π, y is near -1 and y' is near 0,
// // as expected.

// console.log(s.solve(eq, 0, [1, 0], Math.PI));

// ------------Foxes and Rabits---------------
// var LotkaVolterra = function (a, b, c, d) {
//   return function (x, y) {
//     return [a * y[0] - b * y[0] * y[1], c * y[0] * y[1] - d * y[1]];
//   };
// };

// var s = new odex.Solver(2);

// console.log(s.solve(LotkaVolterra(2 / 3, 4 / 3, 1, 1), 0, [1, 1], 6));

export default function sketch4(p) {
  p.sliderT = p.createSlider(0, 50, 32);
  p.sliderT.style('width', '80px');
  p.sliderT.position(50, 405);
  p.sliderR = p.createSlider(0, 50, 23);
  p.sliderR.style('width', '80px');
  p.sliderR.position(50, 435);

  var abc;
  var def;

  const odex = require('odex');
  // ------------SIR---------------
  // var abcdef = 3.2;
  const SIR = function () {
    return function (x, y) {
      // console.log(xyzabc);
      return [-abc * y[0] * y[1], abc * y[0] * y[1] - def * y[1], def * y[1]];
    };
  };

  const s = new odex.Solver(3);
  let t = 2.5;
  const S = s.solve(SIR(3.2, 0.23), 0, [0.99, 0.01, 0], t).y[0];
  const I = s.solve(SIR(3.2, 0.23), 0, [0.99, 0.01, 0], t).y[1];
  const R = s.solve(SIR(3.2, 0.23), 0, [0.99, 0.01, 0], t).y[2];
  console.log(S);
  console.log(I);
  console.log(R);

  let xv = 20;
  let yv = 20;
  let grid = 21;

  p.setup = function () {
    p.createCanvas(421, 501);
    // let int = p.createInput('0.05*y');
    // int.elt.id = 'eq';
  };

  p.draw = function () {
    abc = p.sliderT.value() / 10;
    def = p.sliderR.value() / 100;
    p.background(255, 255, 255);
    // p.background(255);
    graphAxis();
    // equation(p.select('#eq').value());
    drawSIR();
    sliderTextKey();
  };

  function sliderTextKey() {
    p.stroke(0);
    p.strokeWeight(1);
    p.textAlign(p.LEFT);
    //Position relative to translate
    p.text('Transmition Rate: dT  =', 110, 35);
    p.text('Recovery Rate:    dR  =', 110, 65);
    p.text('R-Value =', 110, 95);
    p.text('dT', 170, 88);
    p.line(170, 91, 185, 91);
    p.text('dR', 170, 102);
    p.text(':      R  =', 190, 95);
    p.text('0', 222, 101);
    p.text(Math.round(abc * 10) / 10, 240, 35);
    p.text(Math.round(def * 10) / 10, 240, 65);
    p.text(Math.round((abc * 10) / def) / 10, 240, 95);
    p.line(295, 28, 295, 90);
    p.line(295, 28, 365, 28);
    p.line(365, 28, 365, 90);
    p.line(365, 90, 295, 90);
    p.text('Key', 300, 40);
    p.stroke(0, 0, 255);
    p.text('Suseptible', 300, 55);
    p.stroke(255, 0, 0);
    p.text('Infected', 300, 70);
    p.stroke(0, 255, 0);
    p.text('Recovered', 300, 85);
  }

  function graphAxis() {
    p.stroke(0);
    p.strokeWeight(3);
    p.line(2 * xv, 0, 2 * xv, grid * yv);
    p.line(xv, grid * yv - yv, grid * xv, grid * yv - yv);
    var x = grid;
    // var x = Math.floor(p.width / xv);
    // var y = Math.floor(p.height / yv);

    p.strokeWeight(1);
    for (var i = 0; i < x; i++) {
      p.textAlign(p.CENTER);
      p.stroke(100);
      p.line((i + 2) * xv, 0, (i + 2) * xv, grid * yv - yv);
      p.stroke(0);
      p.text(i, i * yv + 2 * xv, grid * yv - yv + 12);
    }
    for (var j = 0; j < x; j++) {
      p.textAlign(p.RIGHT);
      p.stroke(100);
      p.line(xv * 2, j * xv, (grid + 1) * xv, j * xv);
      p.stroke(0);
      p.text(j / xv, 2 * xv - 4, grid * yv - j * xv - yv + 4);
    }
  }

  // function equation(str) {
  //   // p.translate(p.width / 2, p.height / 2);
  //   p.translate(xv, p.height - yv);
  // p.strokeWeight(5);
  // p.noFill();
  // p.stroke(0, 0, 255);
  //   if (typeof str == 'string') {
  //     str = str.replace(/\s/g, '');
  //     var xIn = getAllIndexes(str, 'y');
  //     if (xIn !== -1) {
  //       var x = Math.floor(p.width / xv);
  //       p.beginShape();
  //       for (var xi = 0; xi < x; xi += 0.2) {
  //         var temp = '';
  //         for (var i = 0; i < str.length; i++) {
  //           if (!xIn.includes(i)) temp += str[i];
  //           else temp += xi * yv;
  //         }
  //         try {
  //           p.vertex(xi * xv, -1 * xv * eval(temp));
  //           // console.log(-1 * xv * eval(temp));
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       }
  //       p.endShape();
  //     }
  //   }
  // }

  // function getAllIndexes(arr, val) {
  //   let indexes = [];
  //   for (let i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
  //   if (indexes.length > 0) return indexes;
  //   else return -1;
  // }

  function drawSIR() {
    p.translate(2 * xv, grid * yv - yv);

    p.strokeWeight(5);
    p.noFill();

    var x = Math.floor(p.width / xv);

    p.stroke(0, 0, 255);
    p.beginShape();
    for (let t = 0; t < x; t += 0.2) {
      let S = s.solve(SIR(3.2, 0.23), 0, [0.99, 0.01, 0], t).y[0];
      try {
        p.vertex(t * xv, -xv * yv * S);
      } catch (err) {
        console.log(err);
      }
    }
    p.endShape();

    p.stroke(255, 0, 0);
    p.beginShape();
    for (let t = 0; t < x; t += 0.2) {
      let I = s.solve(SIR(3.2, 0.23), 0, [0.99, 0.01, 0], t).y[1];
      try {
        p.vertex(t * xv, -xv * yv * I);
      } catch (err) {
        console.log(err);
      }
    }
    p.endShape();

    p.stroke(0, 255, 0);
    p.beginShape();
    for (let t = 0; t < x; t += 0.2) {
      let R = s.solve(SIR(3.2, 0.23), 0, [0.99, 0.01, 0], t).y[2];
      try {
        p.vertex(t * xv, -xv * yv * R);
      } catch (err) {
        console.log(err);
      }
    }
    p.endShape();
  }
}
