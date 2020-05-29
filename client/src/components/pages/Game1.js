import React, { useState, useEffect } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

import 'bootstrap/dist/css/bootstrap.min.css';

import stickmenGame from './stickmenGame';
// import stickmenUI from './stickmenUI';

import OpenMenu from './OpenMenu';

const myImage = require('./sprites/Stick.png');
const myImage2 = require('./sprites/StickHeadShot.png');
const myJSON = require('./sprites/stick.json');
const mySound = require('./sounds/shot.mp3');
const rotateGif = require('./sprites/RotateGif.gif');

const Game1 = () => {
  const isClient = typeof window === 'object';

  const [openToggle, setOpenToggle] = useState(false);
  const [windowSize, setWindowSize] = useState(getSize);

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line
  }, []); // Empty array ensures that effect is only run on mount and unmount

  let game;
  const menu = () => {
    setOpenToggle(!openToggle);
  };

  useEffect(() => {
    // prevent touchscroll
    function handleTouchMove(e) {
      e.preventDefault();
    }

    if (windowSize.width / windowSize.height > 1.0) {
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
    } else if (windowSize.width / windowSize.height < 1.0) {
      // enable touchscroll
      document.removeEventListener('touchmove', handleTouchMove, {
        passive: true,
      });
    }

    return () => {
      // enable touchscroll
      document.removeEventListener('touchmove', handleTouchMove, {
        passive: true,
      });
    };
    // eslint-disable-next-line
  }, [windowSize]);

  // prompt landscape
  if (windowSize.width / windowSize.height > 1.0) {
    game = (
      <>
        <P5Wrapper
          sketch={stickmenGame}
          menu={menu}
          openToggle={openToggle}
          image={myImage}
          image2={myImage2}
          json={myJSON}
          sound={mySound}
        />
        {/* <P5Wrapper sketch={stickmenUI} menu={menu} openToggle={openToggle} /> */}
      </>
    );
  } else if (windowSize.width / windowSize.height < 1.0) {
    game = (
      <div className='container'>
        <MenuBar />
        <Navbar /> <img src={rotateGif} alt='loading...' />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        // position: 'fixed',
        // left: '50%',
        // top: '50%',
        // transform: 'translate(-50%, -50%)',
      }}
    >
      {game}
      <OpenMenu openToggle={openToggle} menu={menu} />
    </div>
  );
};

export default Game1;
