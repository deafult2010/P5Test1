import React, { useEffect } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import io from 'socket.io-client';

import sketch from './sketch';
import { timesClicked } from './sketch';
import { data } from './sketch';

const socket = io('http://localhost:5000');

function getCoords() {
  // console.log(arguments);
  // console.log('Sending data from Home.js');
  socket.emit('mouse', data);
}

const Home = () => {
  return (
    <div>
      {/* <h1>Home</h1> */}
      <P5Wrapper sketch={sketch} getCoords={getCoords} />
    </div>
  );
};

export default Home;

document.body.onkeyup = function(e) {
  if (e.keyCode == 32) {
    console.log(timesClicked);
  }
};
