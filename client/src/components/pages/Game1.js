import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch5 from './sketch5';

import 'bootstrap/dist/css/bootstrap.min.css';

const myImage = require('./sprites/Stick.png');
const myJSON = require('./sprites/stick.json');

const Game1 = () => {
  return (
    <div>
      <P5Wrapper sketch={sketch5} image={myImage} json={myJSON} />
    </div>
  );
};

export default Game1;
