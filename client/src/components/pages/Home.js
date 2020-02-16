import React, { useState } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import io from 'socket.io-client';

import sketch from './sketch';
import { timesClicked } from './sketch';
// import { newDrawing } from './sketch';
import { data } from './sketch';

//local vs prod
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  var socket = io('http://localhost:5000');
} else {
  var socket = io();
}

function getCoords() {
  // console.log(arguments);
  // console.log('Sending data from Home.js');
  socket.emit('mouse', data);
}

const Home = () => {
  let [dataX, setDataX] = useState();
  let [dataY, setDataY] = useState();
  socket.on('mouse', function(data) {
    // console.log(data);
    setDataX(data.x);
    setDataY(data.y);
    // console.log('using state: ' + dataX + ' ' + dataY);
  });

  return (
    <div>
      {/* <h1>Home</h1> */}
      {dataX}
      <P5Wrapper
        sketch={sketch}
        getCoords={getCoords}
        dataX={dataX}
        dataY={dataY}
      />
    </div>
  );
};

export default Home;

document.body.onkeyup = function(e) {
  if (e.keyCode == 32) {
    console.log(timesClicked);
  }
};
