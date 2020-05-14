import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch5 from './sketch5';

import 'bootstrap/dist/css/bootstrap.min.css';

const myImage = require('./sprites/Stick.png');
const myImage2 = require('./sprites/StickHeadShot.png');
const myJSON = require('./sprites/stick.json');
const mySound = require('./sounds/shot.mp3');

const Game1 = () => {
  return (
    <div>
      <P5Wrapper
        sketch={sketch5}
        image={myImage}
        image2={myImage2}
        json={myJSON}
        sound={mySound}
      />
    </div>
  );
};

export default Game1;
