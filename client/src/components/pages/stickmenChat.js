import 'p5/lib/p5.js';
// import * as p5 from 'p5/lib/p5.js';

export default function sketch5(p) {
  // Allow for resizing
  let scale;
  let devOrient;
  let prevDevOrient;

  let cb1;
  // let hs1;
  let vs1;
  // Mouse Wheel Delta
  let mwdH = 0;
  let mwdV = 0;

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
    p.resizeCanvas(scale * 680, scale * 200);
  };

  // Scroll
  p.mouseWheel = function (event) {
    mwdH += +event.delta / 2;
    if (mwdH >= 0 && mwdH <= p.width / scale) {
      mwdH += +event.delta / 2;
    } else if (mwdH < 0) {
      mwdH = 0;
    } else if (mwdH > p.width / scale) {
      mwdH = p.width / scale;
    }
    mwdV += +event.delta / 20;
    if (mwdV >= (p.height * 0.15) / scale && mwdV <= (p.height * 0.7) / scale) {
      mwdV += +event.delta / 20;
    } else if (mwdV < (p.height * 0.15) / scale) {
      mwdV = (p.height * 0.15) / scale;
    } else if (mwdV > (p.height * 0.7) / scale) {
      mwdV = (p.height * 0.7) / scale;
    }
  };

  // Draw text - Allow for multicolor text
  p.drawText = function (x, y, text_array) {
    let pos_x = x;
    for (let i = 0; i < text_array.length; ++i) {
      let part = text_array[i];
      let t = part[0];
      let c = part[1];
      let w = p.textWidth(t);
      p.fill(c);
      p.text(t, pos_x, y);
      pos_x += w;
    }
  };

  // props
  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {};

  p.setup = function () {
    p.createCanvas(680, 200);
    p.canvas.oncontextmenu = function (e) {
      e.preventDefault();
    };
    p.noStroke();

    // hs1 = new HScrollbar(0, p.height - 8, p.width, 16, 1);
    vs1 = new VScrollbar(
      p.width * 0.87 - 16,
      p.height * 0.075,
      16,
      p.height * 0.745,
      1
    );

    cb1 = new ChatBox(
      p.width * 0.02,
      p.height * 0.82,
      p.width * 0.85,
      p.height * 0.1
    );
  };

  p.draw = function () {
    p.setScale();
    p.scale(scale);
    p.background(91, 85, 73);

    // Chat Container
    p.push();
    p.noFill();
    p.stroke(0);
    p.strokeWeight(2);
    p.rect(0, 0, p.width / scale, p.height / scale);
    p.fill(255, 228, 178);
    p.rect(
      (p.width * 0.02) / scale,
      (p.height * 0.075) / scale,
      (p.width * 0.85) / scale,
      (p.height * 0.85) / scale
    );
    p.line(
      (p.width * 0.02) / scale,
      (p.height * 0.82) / scale,
      (p.width * 0.85) / scale,
      (p.height * 0.82) / scale
    );
    p.pop();

    // Get the position of the chat scrollbar
    // and convert to a value to display the chats

    // // HORIZONTAL BAR
    // let tv = hs1.getPos();
    // tv = p.map(tv, 0, p.width / scale, 0, 2000 - p.width / scale);
    // p.push();
    // p.translate(-tv, 0);
    // p.fill(255, 0, 0);
    // p.ellipse(0, p.height / scale / 2, 680, 100);
    // p.fill(0, 255, 0);
    // p.ellipse(1000, p.height / scale / 2, 680, 100);
    // p.fill(0, 0, 255);
    // p.ellipse(2000, p.height / scale / 2, 680, 100);
    // p.pop();

    // hs1.update();
    // hs1.display();

    // VERTICAL BAR
    let tv = vs1.getPos();
    tv = p.map(tv, 0, (p.height * 0.8) / scale, 0, 1000 - p.height / scale);

    p.push();
    p.translate(0, -tv);
    p.fill(0);
    p.noStroke();
    p.textSize(14);
    p.textStyle(p.BOLD);
    // map through chats, friends, system, etc.
    p.drawText(17, 203, [
      ['Tom: ', [0, 0, 0]],
      ['Oldest Post', [0, 0, 255]],
    ]);
    p.drawText(17, 223, [
      ['Tom: ', [0, 0, 0]],
      ['Next oldest', [0, 0, 255]],
    ]);
    p.drawText(17, 243, [
      ['Tom: ', [0, 0, 0]],
      ['blah blah blah', [0, 0, 255]],
    ]);
    p.drawText(17, 263, [
      ['Tom: ', [0, 0, 0]],
      ['so much typing going on here', [0, 0, 255]],
    ]);
    p.drawText(17, 283, [
      ['You have 2 doses of potion left.', [150, 150, 150]],
    ]);
    p.drawText(17, 303, [
      ['Tom: ', [0, 0, 0]],
      ['so much typing going on here', [0, 0, 255]],
    ]);
    p.drawText(17, 323, [
      ['Tom: ', [0, 0, 0]],
      ['so much typing going on here', [0, 0, 255]],
    ]);
    p.drawText(17, 343, [
      ['Tom: ', [0, 0, 0]],
      ['Comment abc   e       rtyuf   whewe  sad', [0, 0, 255]],
    ]);
    p.drawText(17, 363, [['You eat the swordfish.', [150, 150, 150]]]);
    p.drawText(17, 383, [['It heals some health.', [150, 150, 150]]]);
    p.drawText(17, 943, [
      ['Tom: ', [0, 0, 0]],
      ['Newest post', [0, 0, 255]],
    ]);
    p.pop();

    vs1.update();
    vs1.display();

    // Overlay to cover texts
    p.strokeWeight(3);
    p.line(0, 0, p.width, 0);
    p.fill(91, 85, 73);
    p.noStroke();
    //Top
    p.rect(
      (p.width * 0.01) / scale,
      (p.height * 0.008) / scale,
      (p.width * 0.98) / scale,
      (p.height * 0.062) / scale
    );

    //Bottom
    p.rect(
      (p.width * 0.01) / scale,
      (p.height * 0.82) / scale,
      (p.width * 0.98) / scale,
      (p.height * 0.18) / scale
    );

    // ChatBox
    cb1.display();
  };

  function ChatBox(xp, yp, cw, ch) {
    this.cwidth = cw;
    this.cheight = ch;
    this.xpos = xp;
    this.ypos = yp;

    this.display = function () {
      p.stroke(0);
      p.strokeWeight(2);
      p.fill(255, 228, 178);
      p.rect(this.xpos, this.ypos, this.cwidth, this.cheight);
      // p.rect(
      //   this.xpos,
      //   this.ypos + this.cheight - this.cwidth,
      //   this.cwidth,
      //   this.cwidth
      // );
    };
  }

  function VScrollbar(xp, yp, sw, sh, l) {
    this.swidth = sw; // width and height of bar
    this.sheight = sh;
    var heighttowidth = sh - sw;
    this.ratio = sh / heighttowidth;
    this.xpos = xp; // x and y position of bar
    this.ypos = yp;
    this.spos = this.ypos + this.sheight / 2 - this.swidth / 2; // x position of slider
    this.newspos = this.spos;
    this.sposMin = this.ypos + this.swidth; // max and min values of slider //this.width for upbtn
    this.sposMax = this.ypos + this.sheight - this.swidth - this.swidth / 2; // 1.5 this.width for down btn + slider
    this.loose = l; // how loose/heavy
    this.over = false; // is the mouse over the slider?
    this.locked = false;

    this.update = function () {
      this.newspos = p.constrain(mwdV, this.sposMin, this.sposMax);
      if (this.overEvent()) {
        this.over = true;
      } else {
        this.over = false;
      }
      if (p.mouseIsPressed && this.over) {
        this.locked = true;
      }
      if (!p.mouseIsPressed) {
        this.locked = false;
      }
      if (this.locked) {
        this.newspos = p.constrain(
          p.mouseY / scale - this.swidth / 2,
          this.sposMin,
          this.sposMax
        );
        mwdV = this.newspos;
      }
      if (p.abs(this.newspos - this.spos) > 1) {
        this.spos = this.spos + (this.newspos - this.spos) / this.loose;
      }
    };

    this.overEvent = function () {
      if (
        p.mouseX / scale > this.xpos &&
        p.mouseX / scale < this.xpos + this.swidth &&
        p.mouseY / scale > this.ypos &&
        p.mouseY / scale < this.ypos + this.sheight
      ) {
        return true;
      } else {
        return false;
      }
    };

    this.display = function () {
      p.stroke(0);
      p.fill(30);
      p.rect(this.xpos, this.ypos, this.swidth, this.sheight);
      if (this.over || this.locked) {
        p.fill(150);
      } else {
        p.fill(85);
      }
      p.rect(this.xpos, this.spos, this.swidth, this.swidth / 2);
      p.rect(this.xpos, this.ypos, this.swidth, this.swidth);
      p.rect(
        this.xpos,
        this.ypos + this.sheight - this.swidth,
        this.swidth,
        this.swidth
      );
      p.fill(0);
      p.triangle(
        this.xpos + this.swidth / 2,
        this.ypos + (this.swidth * 2) / 6,
        this.xpos + (this.swidth * 5) / 6,
        this.ypos + (this.swidth * 4) / 6,
        this.xpos + (this.swidth * 1) / 6,
        this.ypos + (this.swidth * 4) / 6
      );
      p.triangle(
        this.xpos + (this.swidth * 1) / 6,
        this.ypos + this.sheight - (this.swidth * 4) / 6,
        this.xpos + (this.swidth * 5) / 6,
        this.ypos + this.sheight - (this.swidth * 4) / 6,
        this.xpos + this.swidth / 2,
        this.ypos + this.sheight - (this.swidth * 2) / 6
      );
    };

    this.getPos = function () {
      // Convert spos to be values between
      // 0 and the total width of the scrollbar
      return this.spos * this.ratio;
    };
  }

  // function HScrollbar(xp, yp, sw, sh, l) {
  //   this.swidth = sw; // width and height of bar
  //   this.sheight = sh;
  //   var widthtoheight = sw - sh;
  //   this.ratio = sw / widthtoheight;
  //   this.xpos = xp; // x and y position of bar
  //   this.ypos = yp - this.sheight / 2;
  //   this.spos = this.xpos + this.swidth / 2 - this.sheight / 2; // x position of slider
  //   this.newspos = this.spos;
  //   this.sposMin = this.xpos; // max and min values of slider
  //   this.sposMax = this.xpos + this.swidth - this.sheight;
  //   this.loose = l; // how loose/heavy
  //   this.over = false; // is the mouse over the slider?
  //   this.locked = false;

  //   this.update = function () {
  //     this.newspos = p.constrain(mwdH, this.sposMin, this.sposMax);
  //     if (this.overEvent()) {
  //       this.over = true;
  //     } else {
  //       this.over = false;
  //     }
  //     if (p.mouseIsPressed && this.over) {
  //       this.locked = true;
  //     }
  //     if (!p.mouseIsPressed) {
  //       this.locked = false;
  //     }
  //     if (this.locked) {
  //       this.newspos = p.constrain(
  //         p.mouseX / scale - this.sheight / 2,
  //         this.sposMin,
  //         this.sposMax
  //       );
  //       mwdH = this.newspos;
  //     }
  //     if (p.abs(this.newspos - this.spos) > 1) {
  //       this.spos = this.spos + (this.newspos - this.spos) / this.loose;
  //     }
  //   };

  //   this.overEvent = function () {
  //     if (
  //       p.mouseX / scale > this.xpos &&
  //       p.mouseX / scale < this.xpos + this.swidth &&
  //       p.mouseY / scale > this.ypos &&
  //       p.mouseY / scale < this.ypos + this.sheight
  //     ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   };

  //   this.display = function () {
  //     p.noStroke();
  //     p.fill(204);
  //     p.rect(this.xpos, this.ypos, this.swidth, this.sheight);
  //     if (this.over || this.locked) {
  //       p.fill(0, 0, 0);
  //     } else {
  //       p.fill(102, 102, 102);
  //     }
  //     p.rect(this.spos, this.ypos, this.sheight, this.sheight);
  //   };

  //   this.getPos = function () {
  //     // Convert spos to be values between
  //     // 0 and the total width of the scrollbar
  //     return this.spos * this.ratio;
  //   };
  // }
}
