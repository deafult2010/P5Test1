import React, { useState, useEffect } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import io from 'socket.io-client';

import sketch1 from './sketch1';
import { data } from './sketch1';

//local vs prod
var socket;

function getCoords() {
  socket.emit('mouse', data);

  console.log(data);
}

const Home = () => {
  let [dataX, setDataX] = useState();
  let [dataY, setDataY] = useState();

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      socket = io('http://localhost:5000');
    } else {
      socket = io();
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on('mouse', function(data) {
      setDataX(data.x);
      setDataY(data.y);
    });
  });

  return (
    <div className='notouch'>
      <h1>Draw Board</h1>
      <P5Wrapper
        sketch={sketch1}
        getCoords={getCoords}
        dataX={dataX}
        dataY={dataY}
      />
    </div>
  );
};

export default Home;
