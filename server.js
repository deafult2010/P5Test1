const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const path = require('path');
const http = require('http');
const socket = require('socket.io');
const cors = require('cors');
const moment = require('moment');

const app = express();

const { ApolloServer, PubSub } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// Connect Database
const connectDB = require('./config/db');
connectDB();

const pubsub = new PubSub();

// Redirect to https
app.use(sslRedirect());

// CORS
app.use(cors());

// Init Middleware
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Define Routes
app.use('/api/draw', require('./routes/draw'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
  // subscriptions: {
  //   onConnect: (connectionParams, webSocket, context) => {
  //     console.log(
  //       `New GraphQL socket opened: ${webSocket.upgradeReq.headers['sec-websocket-key']}`
  //     );
  //   },
  //   onDisconnect: (webSocket, context) => {
  //     console.log(
  //       `GraphQL socket closed: ${webSocket.upgradeReq.headers['sec-websocket-key']}`
  //     );
  //   },
  // },
});

apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

const server = httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
  );
});

// const server = app.listen({ port: PORT }, () => {
//   console.log(`Server ready at ${apolloServer.graphqlPath}`);
//   console.log(`Subscriptions ready at ${apolloServer.subscriptionsPath}`);
// });

// const server = app.listen(PORT, () =>
//   console.log(`Server started on port ${PORT}`)
// );

// misc functions for generating a random string and for capitalizing the first letter of a work
const randomString = (n) => {
  return [...Array(n)]
    .map((i) => (~~(Math.random() * 36)).toString(36))
    .join('');
};

// Conect Socket
const io = socket(server);
let drawing = { lines: [], name: '', date: '' };

// Blobs Game
let width = 1280;
let height = 720;
let foods = [];
for (var i = 0; i < 300; i++) {
  foods.push(
    new Food(
      Math.random() * width * 4 - width * 2,
      Math.random() * height * 4 - height * 2,
      10
    )
  );
}
let blobs = [];
let Sid = 0;

function Blob(id, name, x, y, r, rank) {
  // SocketID
  this.id = id;
  this.name = name;
  // X & Y pos
  this.x = x;
  this.y = y;
  // Radius
  this.r = r;
  // ServerID
  this.Sid = 0;
  this.rank = rank;
  this.velx = 0;
  this.vely = 0;
  this.update = function (blobData) {
    this.x += blobData.x;
    this.y += blobData.y;
    this.Sid = blobData.Cid;
  };
  this.eats = function (other) {
    let d = Math.sqrt(
      Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
    );
    if (d < this.r + other.r && this.r > other.r) {
      var sum = Math.PI * this.r * this.r + Math.PI * other.r * other.r;
      this.r = Math.sqrt(sum / Math.PI);
      return true;
    } else {
      return false;
    }
  };
  this.constrain = function () {
    if (this.x > width * 2) {
      this.x = width * 2;
    } else if (this.x < -width * 2) {
      this.x = -width * 2;
    }
    if (this.y > height * 2) {
      this.y = height * 2;
    } else if (this.y < -height * 2) {
      this.y = -height * 2;
    }
  };
  this.counter = function () {
    return Math.round(this.r);
  };
}

function Food(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
}

setInterval(gameTick, 100);
function gameTick() {
  io.emit('gameTick', blobs, foods);
}

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection: ' + socket.id);
  socket.emit('joined');

  // -------------------------------------------------------------------
  //Drawing app:
  socket.on('SLine', SLineMsg);
  socket.on('STempLine', STempLineMsg);
  socket.on('SNameId', SNameIdMsg);
  socket.on('SOpenPic', SOpenMsg);
  socket.on('SGetPics', SGetMsg);

  function SLineMsg(line) {
    // socket.broadcast.emit('mouse', data);
    if (drawing.name === '') {
      let nameId = randomString(15);
      // drawing = { lines: [], name: nameId, date: Date.now() };
      drawing = {
        name: nameId,
        desc: '',
        user: '',
        lines: [],
        thumbnail: '',
        date: Date.now(),
      };
    }
    drawing.lines.push(line);
    io.emit('RLine', drawing);
  }

  function SNameIdMsg() {
    // socket.broadcast.emit('mouse', data);
    let nameId = randomString(15);
    // drawing = { lines: [], name: nameId, date: Date.now() };
    drawing = {
      name: nameId,
      desc: '',
      user: '',
      lines: [],
      thumbnail: '',
      date: Date.now(),
    };
    console.log(drawing);
    io.emit('RLine', drawing);
  }

  function STempLineMsg(tempLine) {
    // socket.broadcast.emit('RTempLine', tempLine);
    io.emit('RTempLine', tempLine);
  }

  function SGetMsg() {
    io.emit('RGetPics');
  }

  function SOpenMsg(pic) {
    drawing = pic;
    drawing.date = Date.now();
    io.emit('ROpenPic', drawing);
    io.emit('joined');
    console.log(drawing);
    console.log('abcdefghijklmnopqrstuvwxyz');
  }

  // -------------------------------------------------------------------
  // Blobs Game

  socket.on('start', startGame);
  socket.on('update', updateGame);
  socket.on('exit', exitGame);

  function startGame(name) {
    // Check socket.id does not already exist:
    let blobIndex = blobs
      .map(function (x) {
        return x.id;
      })
      .indexOf(socket.id);
    console.log(blobIndex);
    if (blobIndex != -1) {
      return;
    }

    // width and height defined above. Blob radius between 15 and 24
    let blob = new Blob(
      socket.id,
      name,
      Math.floor(Math.random() * width * 4 - width * 2),
      Math.floor(Math.random() * height * 4 - height * 2),
      Math.random() * (24 - 15 + 1) + 15,
      blobs.length + 1
    );
    blobs.push(blob);
  }

  function exitGame() {
    // Check socket.id does not already exist:
    let blobIndex = blobs
      .map(function (x) {
        return x.id;
      })
      .indexOf(socket.id);
    if (blobIndex > -1) {
      blobs.splice(blobIndex, 1);
    }
    console.log(blobs);
  }

  function updateGame(blobData) {
    // --------- Set variable blob equal to the blob --------
    // --------- of the client sending the update. ----------
    let blobIndex = blobs
      .map(function (x) {
        return x.id;
      })
      .indexOf(socket.id);

    blob = blobs[blobIndex];
    // // -------- Alternate code for same purpose ------------------
    // for (var i = blobs.length - 1; i >= 0; i--) {
    //   if (socket.id == blobs[i].id) {
    //     blob = blobs[i];
    //   }
    // }

    // Update blob's position
    try {
      blob.update(blobData);
      blob.constrain();

      // Loop through all blobs checking if blob eats another blob:
      for (var i = blobs.length - 1; i >= 0; i--) {
        var id = blobs[i].id;
        if (id !== socket.id) {
          if (blob.eats(blobs[i])) {
            blobs.splice(i, 1);
          }
        }
      }

      // Loop through all foods checking if blob eats food:
      for (var i = foods.length - 1; i >= 0; i--) {
        if (blob.eats(foods[i])) {
          foods.splice(i, 1);
          foods.push(
            new Food(
              Math.random() * width * 4 - width * 2,
              Math.random() * height * 4 - height * 2,
              10
            )
          );
        }
      }

      // Loop through all blobs to rank them:
      for (var i = blobs.length - 1; i >= 0; i--) {

        var arr = blobs.map(x => x.r);
        var sorted = arr.slice().sort(function (a, b) { return b - a })
        var ranks = arr.map(function (v) { return sorted.indexOf(v) + 1 });
        blobs[i].rank = ranks[i]
      }
    } catch (err) {
      console.log(err);
    }
  }


  // -------------------------------------------------------------------
  // Stick Game

  function formatMessage(username, text) {
    return {
      username,
      userColor: ['0', '0', '0'],
      text,
      textColor: ['0', '0', '255'],
      time: moment().format('HH:mm:ss'),
      timeUnix: Date.now()
    }
  }

  // Listen for chatMessage
  socket.on('chatMessage', (values) => {
    console.log(values)
    io.emit('message', formatMessage(values.username ? values.username : `Guest ${socket.id.slice(-2)}`, values.chatbox))
  })


  // -------------------------------------------------------------------
  // On close connection
  socket.on('disconnect', function () {
    // Remove Blob
    var elementPos = blobs
      .map(function (x) {
        return x.id;
      })
      .indexOf(socket.id);
    if (elementPos > -1) {
      blobs.splice(elementPos, 1);
    }
    console.log(blobs);
    console.log(socket.id + ' disconnected');
  });
}
