import 'p5/lib/p5.js';
import 'p5/lib/addons/p5.sound.js';
import * as p5 from 'p5/lib/p5.js';

export default function sketch5(p) {
  // Allow for resizing
  let scale;
  let devOrient;
  let prevDevOrient;

  // Images
  // Directory paths (passed in as props due to file hashing)
  let imageX;
  let imageY;
  // Image data
  let spritesheet;
  let spritesheet2;
  // JSON data to split up spritesheets
  let spritedata;
  // sprite arrays
  let animation = [];
  let animation2 = [];
  // Loading of images
  let loadImgs = true;
  // Creating animations from sprites
  let initDraw = true;

  // Mouse Events
  // Mouse held down
  var click = false;
  // Mouse initial down
  var click2 = false;
  // Mouse initial up
  var click3 = false;

  // Audio
  let song;
  let tune;
  let played = false;

  //Game
  // array of enemy stickmen
  let sticks = [];
  //Bullets
  // let bullet;
  // let abcdefg;
  // menu button
  let menuBtn;
  let openToggle;
  let gunBtn;
  let gun = ['rifle', 'auto'];

  // Mouse to Player Vector
  let Mouse;
  let Player;
  // let MtP;
  let bulletEndPoint;
  // let amount = 0;
  // let step = 0.01;

  // Functions

  // Functions must be kept outside of game draw loop to avoid no-loop-func JSLint

  // Mouse
  const ResClick = function () {
    setTimeout(function () {
      click = false;
    }, 101);
  };

  const ResClick2 = function () {
    setTimeout(function () {
      click2 = false;
    }, 50);
  };

  // On releasing mouse allow it to be clicked again
  p.mouseReleased = function () {
    click = false;

    // Use click3 for initial mouse release - allow this to last for 50ms
    click3 = true;
    setTimeout(function () {
      // Set all click 3 variables back to false
      click3 = false;
    }, 50);
  };
  p.touchEnded = function () {
    p.mouseReleased();
  };

  // Weapons
  const nextGun = function () {
    gun.splice(gun.length, 0, gun.splice(0, 1)[0]);
  };
  const currentGun = function () {
    return gun[0];
  };

  // Menu
  function openMenu() {
    p.menu();
  }

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
    scale = Math.min(window.innerWidth / 850, window.innerHeight / 480);
    p.resizeCanvas(scale * 850, scale * 480);
  };

  // props
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
    if (props.sound) {
      song = props.sound;
    }
    p.menu = props.menu;
    openToggle = props.openToggle;
    spritesheet = p.loadImage(imageX);
    spritesheet2 = p.loadImage(imageY);
    tune = p.loadSound(song);

    // No need to use p.loadJSON since I can pass json through props.
    // spritedata = p.loadJSON(jsonX);
  };

  p.setup = function () {
    // Suspend audio until first user interaction (required for chrome and ios)
    p.getAudioContext().suspend();
    p.createCanvas(400, 400);
    p.canvas.oncontextmenu = function (e) {
      e.preventDefault();
    };
    p.setScale();
    menuBtn = new Btn(
      0.8 * (p.width / scale),
      0.075 * (p.height / scale),
      0.15 * (p.width / scale),
      0.05 * (p.height / scale),
      function () {
        return 'Menu (ESC)';
      },
      openMenu
    );
    gunBtn = new Btn(
      0.05 * (p.width / scale),
      0.075 * (p.height / scale),
      0.15 * (p.width / scale),
      0.05 * (p.height / scale),
      currentGun,
      nextGun
    );
    // abcdefg = new Bubble(p.width / 2 / scale, p.height / 2 / scale);
  };

  // function Bubble(x, y) {
  //   this.x = x;
  //   this.y = y;
  //   this.r = 25;
  //   this.col = p.color(255);

  //   this.changeColor = function () {
  //     this.col = p.color(p.random(255), p.random(255), p.random(255));
  //   };
  //   this.show = function () {
  //     p.stroke(255);
  //     p.fill(this.col);
  //     p.ellipse(this.x, this.y, this.r * 2, this.r * 2);
  //   };

  //   this.intersects = function (other) {
  //     var d = p.dist(this.x, this.y, other.x, other.y);
  //     if (d < this.r + other.r) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   };
  // }

  p.draw = function () {
    p.background(0);

    // Player and Mouse position vectors
    Player = p.createVector(p.width / scale, (p.height * 0.8) / scale);
    Mouse = p.createVector(p.mouseX / scale, p.mouseY / scale);
    // MtP = p5.Vector.sub(Mouse, Player);
    bulletEndPoint = p5.Vector.sub(Mouse, Player);
    bulletEndPoint.normalize().mult(Player.x * 1.1);

    // Allow for resize
    p.scale(scale);

    // Allow for orientation
    p.orientation();

    // Should addressbar be activated move canvas down a little
    window.scrollTo(0, 1);

    // Draw BG
    drawBG();

    // Load Sprites for game
    drawSprites();

    // Game Logic

    // If done loading:
    if (!loadImgs) {
      // Draw sprites onto canvas
      if (initDraw) {
        for (let i = 0; i < 10; i++) {
          sticks[i] = new Sprite(
            animation,
            animation2,
            0,
            (0.6 * p.height) / scale + i * p.random(10, 30),
            p.random(0.3, 1),
            true
          );
        }
        // One off - Set to false to avoid loop
        initDraw = false;
      }

      // Once sprites are drawn run the following loop
      if (!initDraw) {
        for (let stick of sticks) {
          stick.show();
          stick.animate();
          stick.clicked();

          // determine if mouse is being clicked
          if (
            ((p.mouseIsPressed && p.mouseButton === p.LEFT) ||
              p.touchStarted) &&
            !click
          ) {
            // play audio on first user interaction (required for chrome and ios)
            if (!played) {
              // Play music
              p.userStartAudio();
              played = true;
            }
            if (
              p.mouseX > 0 &&
              p.mouseX < p.width &&
              p.mouseY > 0 &&
              p.mouseY < p.height
            ) {
              if (p.mouseY > 0.15 * p.height && !openToggle) {
                if (gun[0] === 'rifle') {
                  tune.play();
                  // if (Player) {
                  //   bullet = new Bullet(Player, bulletEndPoint);
                  // }
                } else if (gun[0] === 'auto') {
                  tune.play();
                  ResClick();
                }
                // Draw bullet while click2 is true (for 50ms)
                p.stroke(255, 255, 0);
                p.line(
                  Player.x,
                  Player.y,
                  Player.x + bulletEndPoint.x,
                  Player.y + bulletEndPoint.y
                );
              }
              // Use click2 for initial mouse down - allow this to last for 50ms
              click2 = true;
              ResClick2();
            }

            // Use click for if mouse is held down - set back to false on release
            click = true;
          }
        }
      }
    }

    // Draw UI
    drawUI();

    // bubbleCheck();

    // p.background(240);
    // let v0 = p.createVector(0, 0);

    // let v1 = p.createVector(p.mouseX, p.mouseY);
    // drawArrow(v0, v1, 'red');

    // let v2 = p.createVector(90, 90);
    // drawArrow(v0, v2, 'blue');

    // if (amount > 1 || amount < 0) {
    //   step *= -1;
    // }
    // amount += step;
    // let v3 = p5.Vector.lerp(v1, v2, amount);
    // console.log(v3);

    // drawArrow(v0, v3, 'purple');
  };

  // draw an arrow for a vector at a given base position
  // function drawArrow(base, vec, myColor) {
  //   p.push();
  //   p.stroke(myColor);
  //   p.strokeWeight(3);
  //   p.fill(myColor);
  //   p.translate(base.x, base.y);
  //   p.line(0, 0, vec.x, vec.y);
  //   p.rotate(vec.heading());
  //   let arrowSize = 7;
  //   p.translate(vec.mag() - arrowSize, 0);
  //   p.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  //   p.pop();
  // }

  // const bubbleCheck = function () {
  //   abcdefg.show();
  //   for (let i = 0; i < 50; i++) {
  //     amount += step;
  //     if (amount > 1) {
  //       amount = 1;
  //     }
  //     let hitVec = p5.Vector.lerp(Player, MtP, amount);
  //     // console.log(hitVec);
  //   }
  // };

  function drawBG() {
    // Draw sky & ground
    p.fill(19, 142, 191);
    p.noStroke();
    p.rect(
      0,
      (p.height / scale) * 0.1,
      p.width / scale,
      (p.height / scale) * 0.6
    );
    p.fill(12, 163, 7);
    p.noStroke();
    p.rect(
      0,
      (p.height / scale) * 0.6,
      p.width / scale,
      (p.height * 0.95) / scale
    );
  }

  function drawUI() {
    // Draw Top Margin
    p.fill(255, 222, 173);
    p.noStroke();
    p.rect(0, 0, p.width / scale, (p.height / scale) * 0.05);

    // Draw Top Menu
    p.fill(82, 23, 81);
    p.noStroke();
    p.rect(
      0,
      (p.height / scale) * 0.05,
      p.width / scale,
      (p.height / scale) * 0.1
    );

    // Draw Bottom Margin
    p.fill(255, 222, 173);
    p.noStroke();
    p.rect(0, (p.height / scale) * 0.95, p.width / scale, p.height / scale);

    // btns
    menuBtn.show();
    menuBtn.clicked();
    gunBtn.show();
    gunBtn.clicked();
  }

  function drawSprites() {
    if (
      spritesheet.width > 1 &&
      spritesheet2.width > 1 &&
      spritedata &&
      loadImgs
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

      //set loadImgs to false
      loadImgs = false;
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
        if (this.x > p.width / scale) {
          this.x = -this.animation[0].width / scale;
        }
      }
      if (!this.alive) {
        this.index += 0.35;
      }
    }

    clicked() {
      var dx = p.dist(
        p.mouseX / scale,
        0,
        this.x + this.animation[0].width / 2,
        0
      );
      var dy = p.dist(
        p.mouseY / scale,
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
        if (click2 && this.alive === true) {
          this.alive = false;
          this.index = 0;
        }
      }
    }
  }

  // function Bullet(Player, end) {
  //   this.x1 = Player.x;
  //   this.y1 = Player.y;
  //   this.x2 = end.x;
  //   this.y2 = end.y;
  // }

  function Btn(x, y, w, h, text, callback) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = p.color(100, 100, 100);
    this.text = text;
    this.callback = callback;
    let clickBtn = false;

    this.overRect = function () {
      if (clickBtn) {
        this.col = p.color(220, 220, 220);
      } else {
        if (
          p.mouseX / scale > this.x &&
          p.mouseX / scale < this.x + this.w &&
          p.mouseY / scale > this.y &&
          p.mouseY / scale < this.y + this.h
        ) {
          if (!click) {
            this.col = p.color(160, 160, 160);
          }
        } else {
          this.col = p.color(100, 100, 100);
        }
      }
    };

    this.show = function () {
      this.overRect();
      p.stroke(255, 0, 0);
      p.strokeWeight(1);
      p.fill(this.col);
      p.rect(this.x, this.y, this.w, this.h);
      p.fill(0, 0, 0);
      p.noStroke();
      p.textSize(10);
      p.text(this.text(), this.x + 7, this.y + 14);
    };

    this.clicked = function () {
      var dx = p.dist(p.mouseX / scale, 0, this.x + this.w / 2, 0);
      var dy = p.dist(p.mouseY / scale, 0, this.y + this.h / 2, 0);

      // clicked and released within 50ms
      if (click2 && click3) {
      }
      // Mouse Init Down
      else if (dx < this.w / 2 && dy < this.h / 2 && click2) {
        clickBtn = true;
      }
      // Mouse Init Up
      else if (dx < this.w / 2 && dy < this.h / 2 && click3 && clickBtn) {
        clickBtn = false;
        this.callback();
      }
      //Mouse relased off of button
      else if (click3 && clickBtn) {
        clickBtn = false;
      }
    };
  }
}
