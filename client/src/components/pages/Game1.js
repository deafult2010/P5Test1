import React, { useState, useEffect, useContext } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import io from 'socket.io-client';

import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';
import { useForm } from '../../util/hooks';
import { AuthContext } from '../../context/auth';
import stickmenGame from './stickmenGame';
import stickmenJoystick from './stickmenJoystick';
import stickmenChat from './stickmenChat';
import stickmenUI from './stickmenUI';
import OpenMenu from './OpenMenu';
import GameLogin from './GameLogin'

import 'bootstrap/dist/css/bootstrap.min.css';


var socket;
var initialChats = [{ 'username': 'Tom', 'userColor': ['0', '0', '0'], 'text': 'newest post', 'textColor': ['0', '0', '255'], 'time': '00:00:10', 'timeUnix': 10 },
{ 'username': 'Tom', 'userColor': ['0', '0', '0'], 'text': 'next newest post', 'textColor': ['0', '0', '255'], 'time': '00:00:09', 'timeUnix': 9 },
{ 'username': 'Tom', 'userColor': ['0', '0', '0'], 'text': 'so much typing going on here', 'textColor': ['0', '0', '255'], 'time': '00:00:08', 'timeUnix': 8 },
{ 'username': '', 'userColor': ['0', '0', '0'], 'text': 'It heals some health.', 'textColor': ['150', '150', '150'], 'time': '00:00:07', 'timeUnix': 7 },
{ 'username': '', 'userColor': ['0', '0', '0'], 'text': 'You eat the swordfish.', 'textColor': ['150', '150', '150'], 'time': '00:00:06', 'timeUnix': 6 },
{ 'username': 'Tom', 'userColor': ['0', '0', '0'], 'text': 'so much typing going on here', 'textColor': ['0', '0', '255'], 'time': '00:00:05', 'timeUnix': 5 },
{ 'username': 'Tom', 'userColor': ['0', '0', '0'], 'text': 'blah blah blah', 'textColor': ['0', '0', '255'], 'time': '00:00:04', 'timeUnix': 4 },
{ 'username': '', 'userColor': ['0', '0', '0'], 'text': 'You have 2 doses of potion left.', 'textColor': ['150', '150', '150'], 'time': '00:00:03', 'timeUnix': 3 },
{ 'username': 'Tom', 'userColor': ['0', '0', '0'], 'text': 'next oldest post', 'textColor': ['0', '0', '255'], 'time': '00:00:02', 'timeUnix': 2 },
{ 'username': 'Tom', 'userColor': ['0', '0', '0'], 'text': 'oldest post', 'textColor': ['0', '0', '255'], 'time': '00:00:01', 'timeUnix': 1 },
]

function dataEmit(name, data) {
  socket.emit(name, data);
}

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
  const [inGame, setInGame] = useState(false);
  const [chats, setChats] = useState([]);
  const [socketId, setSocketId] = useState();

  const { user } = useContext(AuthContext);
  const { onChange, onSubmit, values } = useForm(ChatCallback, {
    chatbox: '',
    username: user ? user.username : '',
  });


  function ChatCallback() {
    dataEmit('chatMessage', values);
    values.chatbox = '';
    let postTimes = chats
      .map(function (msg) {
        return msg.timeUnix;
      })
    let oldestPostTime = Math.min(...postTimes)
    if (chats.length > 37) {
      setChats(chats.filter((msg) => (msg.timeUnix !== oldestPostTime)))
    }
  }

  function onGameLogin() {
    setInGame(true);
  }

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

    // Scroll to top.
    window.scrollTo(0, 1);

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

    // Scroll to top.
    window.scrollTo(0, 1);

    return () => {
      // enable touchscroll
      document.removeEventListener('touchmove', handleTouchMove, {
        passive: true,
      });
    };
    // eslint-disable-next-line
  }, [windowSize]);

  useEffect(() => {
    window.addEventListener('orientationchange', function () {
      // Scroll to top.
      window.scrollTo(0, 1);
    });
    return () => {
      document.removeEventListener('orientationchange');
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      socket = io('http://localhost:5000');
    } else {
      socket = io();
    }

    setChats(initialChats)
    socket.on('message', function (newChatsSub) {
      setSocketId(socket.id);
      setChats((prevState) => [newChatsSub, ...prevState])
    });

    return () => {
      socket.disconnect();
    }
  }, []);

  console.log(socketId)

  // prompt landscape
  if (windowSize.width / windowSize.height > 1.0) {
    if (!inGame) {
      game = (<div className='container'>
        <MenuBar />
        <Navbar />
        <GameLogin windowSize={windowSize} onGameLogin={onGameLogin} />
      </div>)
    } else {
      game = (
        <div style={{
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
        }}>
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
            <P5Wrapper sketch={stickmenChat} chats={chats} socketId={socketId} user={user} />
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
                value={values.chatbox}
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
                onChange={onChange}
              ></input>
            </form>
          </div>
        </div>
      );
    }
  } else if (windowSize.width / windowSize.height < 1.0) {
    game = (
      <div className='container'>
        <MenuBar />
        <Navbar /> <img src={rotateGif} alt='loading...' />
      </div>
    );
  }

  return (
    <div>
      {game}
      <OpenMenu openToggle={openToggle} menu={menu} />
    </div>
  );
};

export default Game1;
