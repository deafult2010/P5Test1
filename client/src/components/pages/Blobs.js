import React, { useState, useEffect } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import io from 'socket.io-client';

import sketch2 from './sketch2';
import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

//local vs prod
var socket;

function dataEmit(name, data1, data2) {
  socket.emit(name, data1, data2);
}

const Blobs = () => {
  let [blobsSub, setBlobsSub] = useState();
  let [foodsSub, setFoodsSub] = useState();
  let [socketID, setsocketID] = useState();

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
    socket.on('gameTick', function (newBlobsSub, newFoodsSub) {
      setBlobsSub(newBlobsSub);
      setFoodsSub(newFoodsSub);
      setsocketID(socket.id);
    });
  });

  return (
    <div className='container'>
      <MenuBar />
      <Navbar />
      <h1>Blobs</h1>
      <P5Wrapper
        sketch={sketch2}
        blobsSub={blobsSub}
        foodsSub={foodsSub}
        socketID={socketID}
        dataEmit={dataEmit}
      />
    </div>
  );
};

export default Blobs;
