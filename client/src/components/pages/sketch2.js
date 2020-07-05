export let dataPub1 = [];
export default function sketch2(p) {
  var socketID;
  var inGame = false;
  var countDwn = 0;

  var startBtn;
  var exitBtn;

  // Audio
  var played = false;

  // Mouse Events
  // Mouse held down
  var click = false;
  // Mouse initial down
  var click2 = false;
  // Mouse initial up
  var click3 = false;

  var velx;
  var vely;
  var Cid;
  var timer;
  var foods = [];
  var blobsOld = [];
  var blobs = [];
  var gameHist = [];
  var blobIndex;
  var zoom = 1;

  var scale;

  // Functions
  // Functions must be kept outside of game draw loop to avoid no-loop-func JSLint

  // Mouse

  // // Used for turbo mode (constant reclick 10x per sec)
  // const ResClick = function () {
  //   setTimeout(function () {
  //     click = false;
  //   }, 101);
  // };

  // Used for initial click
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

  p.setScale = function () {
    scale = Math.min(window.innerWidth / 440, (window.innerHeight - 130) / 440);
    p.resizeCanvas(scale * 400, scale * 400);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (newProps) {
    if (newProps.dataEmit) {
      p.dataEmit = newProps.dataEmit;
    }
    if (newProps.blobsSub) {
      // store previous two blobs data arrays from server in another array to allow for interpolation between the two for enemy blobs.
      blobsOld = [...blobsOld, blobs];
      if (blobsOld.length > 2) {
        blobsOld.shift();
      }
      blobs = newProps.blobsSub;
      timer = 0;
    }
    if (newProps.foodsSub) {
      foods = newProps.foodsSub;
    }
    if (newProps.socketID) {
      socketID = newProps.socketID;
    }
  };

  setInterval(function () {
    timer += 1;
  }, 25);

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
      // p.stroke(255, 0, 0);
      // p.strokeWeight(1);
      p.fill(this.col);
      p.rect(this.x, this.y, this.w, this.h);
      p.fill(0, 0, 0);
      // p.noStroke();
      p.textSize(10);
      p.textAlign(p.LEFT);
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

  // function Btn(x, y, w, h, initClick, click, text) {
  //   this.x = x;
  //   this.y = y;
  //   this.w = w;
  //   this.h = h;
  //   this.col = p.color(100, 100, 100);
  //   this.initClick = initClick;
  //   this.click = click;
  //   this.text = text;

  //   this.overRect = function () {
  //     if (this.click) {
  //     } else {
  //       if (
  //         p.mouseX / scale > this.x &&
  //         p.mouseX / scale < this.x + this.w &&
  //         p.mouseY / scale > this.y &&
  //         p.mouseY / scale < this.y + this.h
  //       ) {
  //         this.col = p.color(200, 200, 200);
  //       } else {
  //         this.col = p.color(100, 100, 100);
  //       }
  //     }
  //   };

  //   this.show = function () {
  //     this.overRect();
  //     p.fill(this.col);
  //     p.rect(this.x, this.y, this.w, this.h);
  //     p.fill(0, 0, 0);
  //     p.textSize(10);
  //     p.textAlign(p.LEFT);
  //     p.text(this.text, this.x + 7, this.y + 14);
  //   };

  //   this.clicked = function () {
  //     var dx = p.dist(p.mouseX / scale, 0, this.x + this.w / 2, 0);
  //     var dy = p.dist(p.mouseY / scale, 0, this.y + this.h / 2, 0);
  //     if (dx < this.w / 2 && dy < this.h / 2) {
  //       this.col = p.color(250, 250, 250);
  //       this.click = true;
  //       this.initClick = true;
  //     }
  //   };
  // }

  p.setup = () => {
    p.createCanvas(400, 400);
    p.setScale();
    startBtn = new Btn(
      15,
      30,
      70,
      20,
      function () {
        return 'Start Game';
      },
      startGame
    );
    exitBtn = new Btn(
      330,
      0,
      70,
      20,
      function () {
        return 'Exit Game';
      },
      exitGame
    );
    //disables "context menu" on right click for the canvas
    p.canvas.oncontextmenu = function (e) {
      e.preventDefault();
    };
    p.frameRate(40);
    p.canvas.onselectstart = function () {
      return false;
    };
  };

  function startGame() {
    p.dataEmit('start');
    inGame = true;
    Cid = 0;
    gameHist = [];
  }

  function exitGame() {
    p.dataEmit('exit');
    inGame = false;
  }

  p.draw = () => {
    // Mouse events
    if (
      p.mouseIsPressed &&
      p.mouseButton !== p.RIGHT &&
      p.mouseButton !== p.CENTER &&
      !click
    ) {
      // play audio on first user interaction (required for chrome and ios)
      if (!played) {
        // Play music
        p.userStartAudio();
        played = true;
      }
      // Check click within canvas
      if (
        p.mouseX > 0 &&
        p.mouseX < p.width &&
        p.mouseY > 0 &&
        p.mouseY < p.height
      ) {
        // // For Turbo click use ResClick to reset click to false i.e. mouse not down e.g.
        // if () {
        // } else if () {
        //   ResClick();
        // }

        // Use click2 for initial mouse down - allow this to last for 50ms
        click2 = true;
        ResClick2();
      }

      // Use click for if mouse is held down - set back to false on release
      click = true;
    }

    p.scale(scale);

    // btns
    startBtn.clicked();
    exitBtn.clicked();

    p.background(51);

    if (inGame) {
      // Get user's blob index from array of blobs
      blobIndex = blobs
        .map(function (x) {
          return x.id;
        })
        .indexOf(socketID);
      if (blobIndex === -1 && inGame) {
        countDwn++;
        if (countDwn > 10) {
          inGame = false;
          countDwn = 0;
        }
      } else if (blobIndex !== -1 && inGame) {
        p.push();

        if (gameHist.length > 1) {
          for (let i = blobs[blobIndex].Sid + 1; i < Cid; i++) {
            // Constrain if by edge
            if (
              blobs[blobIndex].x + gameHist[i].x <= 400 &&
              blobs[blobIndex].x + gameHist[i].x >= -400
            ) {
              blobs[blobIndex].x += gameHist[i].x;
            }
            if (
              blobs[blobIndex].y + gameHist[i].y <= 400 &&
              blobs[blobIndex].y + gameHist[i].y >= -400
            ) {
              blobs[blobIndex].y += gameHist[i].y;
            }
            blobs[blobIndex].Sid += 1;
          }
        }

        p.translate(p.width / scale / 2, p.height / scale / 2);
        let newzoom = 20 / blobs[blobIndex].r ** 0.9;
        zoom = p.lerp(zoom, newzoom, 0.05);
        p.scale(zoom);
        p.translate(-blobs[blobIndex].x, -blobs[blobIndex].y);

        // Show foods
        for (let i = foods.length - 1; i >= 0; i--) {
          p.fill(255, 255, 0);
          p.ellipse(foods[i].x, foods[i].y, foods[i].r);
        }

        // Show blobs
        for (let i = blobs.length - 1; i >= 0; i--) {
          let id = blobs[i].id;
          if (id !== socketID) {
            if (blobs[i].r > blobs[blobIndex].r) {
              p.fill(255, 0, 0);
            } else {
              p.fill(0, 0, 255);
            }
            for (let j = blobsOld[0].length - 1; j >= 0; j--) {
              let id2 = blobsOld[0][j].id;
              if (id === id2) {
                let enemyBlobX = p.lerp(
                  blobsOld[0][j].x,
                  blobs[i].x,
                  timer / 4
                );
                let enemyBlobY = p.lerp(
                  blobsOld[0][j].y,
                  blobs[i].y,
                  timer / 4
                );
                p.ellipse(
                  enemyBlobX,
                  enemyBlobY,
                  blobs[i].r * 2,
                  blobs[i].r * 2
                );
                p.fill(255);
                p.textAlign(p.CENTER);
                p.textSize(4);
                p.text(blobs[i].id, enemyBlobX, enemyBlobY + blobs[i].r * 1.5);
              }
            }
          } else if (id === socketID) {
            // --------Do nothing for client blob from server---------------------------
            // --------Client blob logic should be done locally to reduce latency--------

            // Reconcile client's blob vs client's blob from server

            p.fill(255);

            p.ellipse(
              blobs[blobIndex].x,
              blobs[blobIndex].y,
              blobs[blobIndex].r * 2,
              blobs[blobIndex].r * 2
            );

            // Compute Velocity
            if (p.mouseIsPressed) {
              velx = p.mouseX - p.width / 2;
              vely = p.mouseY - p.height / 2;
              let mag = 4;
              let hypot = (velx ** 2 + vely ** 2) ** 0.5;
              velx = (velx * mag) / hypot;
              vely = (vely * mag) / hypot;
            } else if (!p.mouseIsPressed) {
              velx = 0;
              vely = 0;
            }
          }
        }

        p.pop();

        dataPub1 = {
          x: velx,
          y: vely,
          Cid: Cid,
        };
        if (dataPub1.x !== 0 || dataPub1.y !== 0) {
          p.dataEmit('update', dataPub1);
          gameHist = [...gameHist, dataPub1];
          Cid = Cid + 1;
        }

        //score
        p.fill(0);
        p.rect(0, 0, 100, 30);
        p.textAlign(p.LEFT);
        p.textSize(18);
        p.fill(255);
        p.text('score', 10, 20);
        p.text(Math.round(blobs[blobIndex].r), 65, 20);
        exitBtn.show();
      }
    } else {
      startBtn.show();
    }
  };

  p.windowResized = function () {
    p.setScale();
    p.background(0);
  };
}
