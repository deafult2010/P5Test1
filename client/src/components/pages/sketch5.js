export default function sketch5(p) {
  let spritesheet;
  let spritedata;
  let imageX;
  let animation = [];
  let sticks = [];
  let check = true;
  let check2 = true;

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.image) {
      imageX = props.image;
    }
    if (props.json) {
      spritedata = props.json;
    }
    spritesheet = p.loadImage(imageX);
    // No need to use p.loadJSON since I can pass json through props.
    // spritedata = p.loadJSON(jsonX);
  };

  p.setup = function () {
    p.createCanvas(400, 400);
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
              0,
              i * p.random(10, 30),
              p.random(0.3, 1)
            );
          }
          check2 = false;
        }
        if (!check2) {
          for (let stick of sticks) {
            stick.show();
            stick.animate();
          }
        }
      }
    }
  };

  async function drawSprites() {
    if (spritesheet.width > 1 && spritedata && check) {
      p.background(0);
      await p.image(spritesheet, 0, 0);
      let frames = spritedata.frames;
      for (let i = 0; i < frames.length; i++) {
        let pos = frames[i].position;
        let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
        animation.push(img);
        console.log(spritesheet.width);
      }
      // console.log(spritedata);
      p.background(0);
      // p.image(animation[p.frameCount % animation.length], 0, 0);
      check = false;
      console.log(animation);
      p.background(0);
    }
  }

  class Sprite {
    constructor(animation, x, y, speed) {
      this.x = x;
      this.y = y;
      this.animation = animation;
      this.len = this.animation.length;
      this.speed = speed;
      this.index = 0;
    }
    show() {
      let index = p.floor(this.index) % this.len;
      p.image(this.animation[index], this.x, this.y);
    }

    animate() {
      this.index += this.speed;
      this.x += this.speed * 5;
      if (this.x > p.width) {
        this.x = -this.animation[0].width;
      }
    }
  }
}
