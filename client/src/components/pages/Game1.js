import React, { useState, useEffect } from 'react';
import P5Wrapper from 'react-p5-wrapper';

import 'bootstrap/dist/css/bootstrap.min.css';

import sketch5 from './sketch5';
import OpenMenu from './OpenMenu';

const myImage = require('./sprites/Stick.png');
const myImage2 = require('./sprites/StickHeadShot.png');
const myJSON = require('./sprites/stick.json');
const mySound = require('./sounds/shot.mp3');

const Game1 = () => {
  let [openToggle, setOpenToggle] = useState(true);
  const menu = () => {
    setOpenToggle(!openToggle);
  };

  useEffect(() => {
    // prevent touchscroll
    function handleTouchMove(e) {
      e.preventDefault();
    }

    document.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });
    return () => {
      // enable touchscroll
      document.removeEventListener('touchmove', handleTouchMove, {
        passive: true,
      });
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <P5Wrapper
        sketch={sketch5}
        menu={menu}
        openToggle={openToggle}
        image={myImage}
        image2={myImage2}
        json={myJSON}
        sound={mySound}
      />
      <OpenMenu openToggle={openToggle} menu={menu} />
    </div>
  );
};

export default Game1;
