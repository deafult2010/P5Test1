import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch5 from './sketch5';

import 'bootstrap/dist/css/bootstrap.min.css';

const Game1 = () => {
  return (
    <div>
      <P5Wrapper sketch={sketch5} />
    </div>
  );
};

export default Game1;
