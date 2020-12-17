import React, { useState, useEffect, useContext } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import io from 'socket.io-client';

import sketch2 from './sketch2';
import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';
import stickmenChat from './stickmenChat';
import GameLogin from './GameLogin'
import OpenMenu from './OpenMenu';
import { useForm } from '../../util/hooks';
import { AuthContext } from '../../context/auth';

//local vs prod
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

const rotateGif = require('./sprites/RotateGif.gif');
const StickBGPic = require('./images/StickBGImage.PNG');

function dataEmit(name, data1) {
  socket.emit(name, data1);
}

const Blobs = () => {
  const isClient = typeof window === 'object';

  let [blobsSub, setBlobsSub] = useState();
  let [foodsSub, setFoodsSub] = useState();
  let [socketId, setSocketId] = useState();
  const [inGame, setInGame] = useState(false);
  const [windowSize, setWindowSize] = useState(getSize);
  const [openToggle, setOpenToggle] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [chats, setChats] = useState([]);

  let game
  const menu = () => {
    setOpenToggle(!openToggle);
  };
  const toggleChat = () => {
    setShowChat(!showChat);
  };

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

  useEffect(() => {
    // prevent touchscroll
    function handleTouchMove(e) {
      e.preventDefault();
    }
    document.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });

    // Scroll to top.
    window.scrollTo(0, 1);

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
      // enable touchscroll
      document.removeEventListener('touchmove', handleTouchMove, {
        passive: true,
      });
    };
  }, []);

  useEffect(() => {
    window.addEventListener('orientationchange', handleOrientation)

    function handleOrientation() {
      // Scroll to top.
      window.scrollTo(0, 1);
    };
    return () => {
      document.removeEventListener('orientationchange', handleOrientation);
    };
    // eslint-disable-next-line
  }, []);

  window.scrollTo(0, 1);

  useEffect(() => {
    socket.on('gameTick', function (newBlobsSub, newFoodsSub) {
      setBlobsSub(newBlobsSub);
      setFoodsSub(newFoodsSub);
      setSocketId(socket.id);
    });
  }, []);

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

  // prompt landscape
  if (windowSize.width / windowSize.height > 1.0) {
    if (!inGame) {
      game = (<div className='container'>
        <MenuBar />
        <Navbar />
        <GameLogin windowSize={windowSize} onGameLogin={onGameLogin} BGPic={StickBGPic} />
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
              sketch={sketch2}
              blobsSub={blobsSub}
              foodsSub={foodsSub}
              socketId={socketId}
              dataEmit={dataEmit}
              menu={menu}
              openToggle={openToggle}
              toggleChat={toggleChat}
              showChat={showChat}
              user={user}
            />
          </div>

          {/* Chat */}
          <div style={{ display: showChat ? 'none' : 'inline' }}>
            <div
              style={{
                position: 'absolute',
                opacity: '0.5',
                left: Math.min(
                  windowSize.width * (1 - 600 / 1280),
                  (windowSize.height * 16 * (1 - 600 / 1280)) / 9
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
                  windowSize.width * (1 - 586 / 1280),
                  (windowSize.height * 16 * (1 - 586 / 1280)) / 9
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
                  opacity: '1'
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

export default Blobs;
