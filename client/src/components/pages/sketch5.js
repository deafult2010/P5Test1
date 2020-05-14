export default function sketch5(p) {
  let spritesheet;
  let spritesheet2;
  let spritedata;
  let imageX;
  let imageY;
  let animation = [];
  let animation2 = [];
  let sticks = [];
  let check = true;
  let check2 = true;
  let click = false;
  let click2 = false;

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.image) {
      imageX = props.image;
    }
    if (props.image2) {
      imageX = props.image;
      imageY = props.image2;
    }
    if (props.json) {
      spritedata = props.json;
    }
    spritesheet = p.loadImage(imageX);
    spritesheet2 = p.loadImage(imageY);
    // No need to use p.loadJSON since I can pass json through props.
    // spritedata = p.loadJSON(jsonX);
  };

  p.setup = function () {
    p.createCanvas(400, 400);
    //disables "context menu" on right click for the canvas
    p.canvas.oncontextmenu = function (e) {
      e.preventDefault();
    };
  };

  p.draw = function () {
    p.background(0);
    drawSprites();
    if (spritesheet && spritedata) {
      if (!check) {
        if (check2) {
          for (let i = 0; i < 30; i++) {
            sticks[i] = new Sprite(
              animation,
              animation2,
              0,
              i * p.random(10, 30),
              p.random(0.3, 1),
              true
            );
          }
          check2 = false;
        }
        if (!check2) {
          for (let stick of sticks) {
            stick.show();
            stick.animate();
            stick.clicked();
            if ((p.mouseIsPressed || p.touchStarted) && !click) {
              click = true;
              click2 = true;
              setTimeout(function () {
                click2 = false;
              }, 50);
            }
            p.mouseReleased = function () {
              click = false;
            };
            p.touchEnded = function () {
              click = false;
            };
          }
        }
      }
    }
  };

  function drawSprites() {
    if (
      spritesheet.width > 1 &&
      spritesheet2.width > 1 &&
      spritedata &&
      check
    ) {
      //Create animation for sprite1
      p.background(0);
      p.image(spritesheet, 0, 0);
      let frames = spritedata.frames;
      for (let i = 0; i < frames.length; i++) {
        let pos = frames[i].position;
        let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
        animation.push(img);
      }

      //Create animation for sprite2
      p.background(0);
      p.image(spritesheet2, 0, 0);
      frames = spritedata.frames;
      for (let i = 0; i < frames.length; i++) {
        let pos = frames[i].position;
        let img = spritesheet2.get(pos.x, pos.y, pos.w, pos.h);
        animation2.push(img);
      }
      p.background(0);

      //set check to false
      check = false;
    }
  }

  class Sprite {
    constructor(animation, animation2, x, y, speed, alive) {
      this.x = x;
      this.y = y;
      this.animation = animation;
      this.animation2 = animation2;
      this.len = this.animation.length;
      this.len2 = this.animation2.length;
      this.speed = speed;
      this.index = 0;
      this.alive = alive;
    }
    show() {
      if (this.alive) {
        let index = p.floor(this.index) % this.len;
        p.image(this.animation[index], this.x, this.y);
      }
      if (!this.alive) {
        let index = p.floor(this.index) % this.len2;
        p.image(this.animation2[index], this.x, this.y);
        if (index === 11) {
          sticks = sticks.filter((sprite) => sprite.x !== this.x);
        }
      }
    }

    animate() {
      if (this.alive) {
        this.index += this.speed;
        this.x += this.speed * 5;
        if (this.x > p.width) {
          this.x = -this.animation[0].width;
        }
      }
      if (!this.alive) {
        this.index += 0.35;
      }
    }

    clicked() {
      var dx = p.dist(p.mouseX, 0, this.x + this.animation[0].width / 2, 0);
      var dy = p.dist(
        p.mouseY,
        0,
        this.y + this.animation[0].height / 2 - 22,
        0
      );

      if (
        // use divisor greater than two to restrict click area sensitivity
        // dx < this.animation[0].width / 2 &&
        // dy < this.animation[0].height / 2
        dx < this.animation[0].width / 5 &&
        dy < this.animation[0].height / 6
      ) {
        if (click2) {
          this.alive = false;
          this.index = 0;
        }
      }
    }
  }
}
