export let dataPub1 = [];
export default function sketch2(p) {
  var socketID;
  var inGame = false;
  var initClick;
  var countDwn = 0;

  var startBtn;

  var velx;
  var vely;
  var Cid;
  var foods = [];
  var blobs = [];
  var gameHist = [];
  var blobIndex;
  var zoom = 1;

  var scale;

  p.setScale = function () {
    scale = Math.min(window.innerWidth / 600, (window.innerHeight - 130) / 600);
    p.resizeCanvas(scale * 580, scale * 580);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (newProps) {
    if (newProps.dataEmit) {
      p.dataEmit = newProps.dataEmit;
    }
    if (newProps.blobsSub) {
      blobs = newProps.blobsSub;
    }
    if (newProps.foodsSub) {
      foods = newProps.foodsSub;
    }
    if (newProps.socketID) {
      socketID = newProps.socketID;
    }
  };

  function StartBtn(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = p.color(100, 100, 100);
    var click;

    this.overRect = function () {
      if (click) {
      } else {
        if (
          p.mouseX / scale > this.x &&
          p.mouseX / scale < this.x + this.w &&
          p.mouseY / scale > this.y &&
          p.mouseY / scale < this.y + this.h
        ) {
          this.col = p.color(200, 200, 200);
        } else {
          this.col = p.color(100, 100, 100);
        }
      }
    };

    this.show = function () {
      this.overRect();
      p.fill(this.col);
      p.rect(this.x, this.y, this.w, this.h);
      p.fill(0, 0, 0);
      p.textSize(10);
      p.text('Start Game', this.x + 7, this.y + 14);
    };

    this.clicked = function () {
      var dx = p.dist(p.mouseX / scale, 0, this.x + this.w / 2, 0);
      var dy = p.dist(p.mouseY / scale, 0, this.y + this.h / 2, 0);
      if (dx < this.w / 2 && dy < this.h / 2) {
        this.col = p.color(250, 250, 250);
        click = true;
        initClick = true;
      }
    };
  }

  p.setup = () => {
    p.createCanvas(600, 600);
    p.setScale();
    startBtn = new StartBtn(15, 30, 70, 20);
    //disables "context menu" on right click for the canvas
    p.canvas.oncontextmenu = function (e) {
      e.preventDefault();
    };
    p.frameRate(20);
    p.canvas.onselectstart = function () {
      return false;
    };
  };

  function startGame() {
    p.dataEmit('start');
    Cid = 0;
    initClick = false;
  }

  p.draw = () => {
    p.scale(scale);
    if (p.mouseIsPressed) {
      startBtn.clicked();
      if (!inGame && initClick) {
        inGame = true;
        startGame();
      }
    }

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
          console.log(blobs[blobIndex]);
          for (var i = blobs[blobIndex].Sid + 1; i < Cid; i++) {
            blobs[blobIndex].x += gameHist[i].x;
            blobs[blobIndex].y += gameHist[i].y;
          }
          console.log(blobs[blobIndex]);
        }

        p.translate(p.width / scale / 2, p.height / scale / 2);
        let newzoom = 20 / blobs[blobIndex].r ** 0.7;
        zoom = p.lerp(zoom, newzoom, 0.05);
        p.scale(zoom);
        p.translate(-blobs[blobIndex].x, -blobs[blobIndex].y);

        // Show foods
        for (i = foods.length - 1; i >= 0; i--) {
          p.fill(255, 255, 0);
          p.ellipse(foods[i].x, foods[i].y, foods[i].r);
        }

        // Show blobs
        for (i = blobs.length - 1; i >= 0; i--) {
          var id = blobs[i].id;
          if (id !== socketID) {
            if (blobs[i].r > blobs[blobIndex].r) {
              p.fill(255, 0, 0);
            } else {
              p.fill(0, 0, 255);
            }
            p.ellipse(blobs[i].x, blobs[i].y, blobs[i].r * 2, blobs[i].r * 2);

            p.fill(255);
            p.textAlign(p.CENTER);
            p.textSize(4);
            p.text(blobs[i].id, blobs[i].x, blobs[i].y + blobs[i].r * 1.5);
          } else if (id === socketID) {
            // --------Do nothing for client blob from server---------------------------
            // --------Client blob logic should be done locally to reduce latency--------

            // Reconcile client's blob vs client's blob from server

            p.fill(255);
            console.log(Cid - 1);
            console.log(blobs[blobIndex].Sid);

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
              blobs[blobIndex].x += velx;
              blobs[blobIndex].y += vely;

              // var newvel = createVector(mouseX - width / 2, mouseY - height / 2);
              // // vel.sub(this.pos);
              // newvel.setMag((abs(mouseX - width / 2) + abs(mouseY - height / 2)) / 100);
              // this.vel.lerp(newvel, 0.05);
              // this.pos.add(this.vel);
            } else if (!p.mouseIsPressed) {
              velx = 0;
              vely = 0;
            }

            // Constrain to map
            blobs[blobIndex].x = p.constrain(
              blobs[blobIndex].x,
              -p.width / scale,
              p.width / scale
            );
            blobs[blobIndex].y = p.constrain(
              blobs[blobIndex].y,
              -p.height / scale,
              p.height / scale
            );
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
        p.rect(0, 0, 100, 100);
        p.textAlign(p.CENTER);
        p.textSize(18);
        p.fill(255);
        p.text('score', 50, 30);
        p.text(Math.round(blobs[blobIndex].r), 50, 70);
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
