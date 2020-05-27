import React, { useState, useEffect } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Navbar from '../layout/Navbar';

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
  let [openToggle, setOpenToggle] = useState(false);
  let game;
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

  const size = useWindowSize();

  // prompt landscape
  if (size.width / size.height > 1.0) {
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
  } else {
    game = (
      <div className='container'>
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

// Hook
function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

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

  return windowSize;
}

export default Game1;
