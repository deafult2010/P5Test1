const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const path = require('path');
const socket = require('socket.io');
const cors = require('cors');

const app = express();

const { ApolloServer, PubSub } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const connectDB = require('./config/db');

// Connect Database
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
});

apolloServer.applyMiddleware({ app });

const server = app.listen({ port: PORT }, () => {
  console.log(`Server ready at ${apolloServer.graphqlPath}`);
});

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
var drawing = { lines: [], name: '', date: '' };

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection: ' + socket.id);
  socket.emit('joined');

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

  socket.on('disconnect', function () {
    console.log(socket.id + ' disconnected');
  });
}
