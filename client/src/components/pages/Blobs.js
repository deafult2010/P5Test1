import React, { useState, useEffect } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import io from 'socket.io-client';

import sketch2 from './sketch2';
import { Nfoods } from './sketch2';
import { data } from './sketch2';
import { eatFood } from './sketch2';
import { eatBlob } from './sketch2';

//local vs prod
var socket;

function newFoods() {
  for (var i = 0; i < 10; i++) {
    var dataF = {
      x: Nfoods[i].pos.x,
      y: Nfoods[i].pos.y,
      r: Nfoods[i].r
    };
    socket.emit('initFood', dataF);
  }
}

function start() {
  socket.emit('start', data);
  console.log(data);
  console.log('emmitting start');
}

const Blobs = () => {
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

  useEffect(() => {
    socket.on('mouse', function(data) {
      setDataX(data.x);
      setDataY(data.y);
    });
  });

  return (
    <div>
      <h1>Blobs</h1>
      <P5Wrapper
        sketch={sketch2}
        newFoods={newFoods}
        dataX={dataX}
        dataY={dataY}
        start={start}
      />
    </div>
  );
};

export default Blobs;
