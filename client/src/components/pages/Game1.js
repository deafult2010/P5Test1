import React, { useState, useEffect } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

import 'bootstrap/dist/css/bootstrap.min.css';

import stickmenGame from './stickmenGame';
import stickmenJoystick from './stickmenJoystick';
import stickmenChat from './stickmenChat';
import stickmenUI from './stickmenUI';

import OpenMenu from './OpenMenu';

const myImage = require('./sprites/Stick.png');
const myImage2 = require('./sprites/StickHeadShot.png');
const keysImage = require('./sprites/Keys.png');
const leftImage = require('./sprites/LeftClick.png');
const altImage = require('./sprites/AltClick.png');
const UIImage = require('./sprites/UI.png');
const myJSON = require('./sprites/stick.json');
const mySound = require('./sounds/shot.mp3');
const rotateGif = require('./sprites/RotateGif.gif');

const Game1 = () => {
  const isClient = typeof window === 'object';

  const [openToggle, setOpenToggle] = useState(false);
  const [windowSize, setWindowSize] = useState(getSize);
  const [chat, setChat] = useState('');

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(chat);
    setChat('');
  };

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
    console.log(windowSize.height);
    console.log(
      Math.min(
        windowSize.height * (1 - 33 / 720),
        (windowSize.width * 9 * (1 - 33 / 720)) / 16
      )
    );

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
      <div>
        {/* Game */}
        <div
          style={{
            position: 'absolute',
            left: '0',
            top: '0',
          }}
        >
          <P5Wrapper
            sketch={stickmenGame}
            menu={menu}
            openToggle={openToggle}
            image={myImage}
            image2={myImage2}
            json={myJSON}
            sound={mySound}
          />
        </div>

        {/* UI */}
        <div
          style={{
            position: 'absolute',
            left: Math.min(
              windowSize.width * (1 - 400 / 1280),
              (windowSize.height * 16 * (1 - 400 / 1280)) / 9
            ),
            top: Math.min(
              windowSize.height * (1 - 720 / 720),
              (windowSize.width * 9 * (1 - 720 / 720)) / 16
            ),
          }}
        >
          <P5Wrapper sketch={stickmenUI} UIImage={UIImage} />
        </div>

        {/* Joysticks */}
        <div
          style={{
            position: 'absolute',
            left: '0',
            top: Math.min(
              windowSize.height * (1 - 200 / 720),
              (windowSize.width * 9 * (1 - 200 / 720)) / 16
            ),
          }}
        >
          <P5Wrapper sketch={stickmenJoystick} keysImage={keysImage} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: Math.min(
              windowSize.width * (1 - 400 / 1280),
              (windowSize.height * 16 * (1 - 400 / 1280)) / 9
            ),
            top: Math.min(
              windowSize.height * (1 - 200 / 720),
              (windowSize.width * 9 * (1 - 200 / 720)) / 16
            ),
          }}
        >
          <P5Wrapper sketch={stickmenJoystick} altImage={altImage} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: Math.min(
              windowSize.width * (1 - 200 / 1280),
              (windowSize.height * 16 * (1 - 200 / 1280)) / 9
            ),
            top: Math.min(
              windowSize.height * (1 - 200 / 720),
              (windowSize.width * 9 * (1 - 200 / 720)) / 16
            ),
          }}
        >
          <P5Wrapper sketch={stickmenJoystick} leftImage={leftImage} />
        </div>

        {/* Chat */}
        <div
          style={{
            position: 'absolute',
            left: Math.min(
              windowSize.width * (1 - 1080 / 1280),
              (windowSize.height * 16 * (1 - 1080 / 1280)) / 9
            ),
            top: Math.min(
              windowSize.height * (1 - 200 / 720),
              (windowSize.width * 9 * (1 - 200 / 720)) / 16
            ),
          }}
        >
          <P5Wrapper sketch={stickmenChat} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: Math.min(
              windowSize.width * (1 - 1066 / 1280),
              (windowSize.height * 16 * (1 - 1066 / 1280)) / 9
            ),
            top: Math.min(
              windowSize.height * (1 - 34 / 720),
              (windowSize.width * 9 * (1 - 34 / 720)) / 16
            ),
            fontSize: Math.min(
              (windowSize.width * 16) / 1280,
              (windowSize.height * 16) / 720
            ),
            width: Math.min(
              windowSize.width * (1 - 702 / 1280),
              (windowSize.height * 16 * (1 - 702 / 1280)) / 9
            ),
          }}
        >
          <form
            onSubmit={onSubmit}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              fontWeight: 'bold',
              color: '#0000FF',
              backgroundColor: '#FFE4B2',
              borderStyle: 'none',
              width: '100%',
              margin: '0px',
              fontSize: Math.min(
                (windowSize.width * 16) / 1280,
                (windowSize.height * 16) / 720
              ),
            }}
          >
            <input
              type='text'
              name='chatbox'
              value={chat}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                fontWeight: 'bold',
                color: '#0000FF',
                backgroundColor: '#FFE4B2',
                borderStyle: 'none',
                width: '100%',
                margin: '0px',
                fontSize: Math.min(
                  (windowSize.width * 16) / 1280,
                  (windowSize.height * 16) / 720
                ),
              }}
              onChange={(e) => setChat(e.target.value)}
            ></input>
          </form>
        </div>
      </div>
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
        // display: 'flex',
        // justifyContent: 'center',
        position: 'relative',
        // position: 'fixed',
        left: Math.max(
          (windowSize.width - (windowSize.height * 16) / 9) / 2,
          0
        ),
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
