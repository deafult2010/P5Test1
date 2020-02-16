import React from 'react';
import P5Wrapper from 'react-p5-wrapper';

import sketch from './sketch';
import { timesClicked } from './sketch';

function getCoords() {
  console.log(arguments);
}

const Home = () => {
  return (
    <div>
      {/* <h1>Home</h1> */}
      <P5Wrapper sketch={sketch} getCoords={getCoords} />
    </div>
  );
};

export default Home;

document.body.onkeyup = function(e) {
  if (e.keyCode == 32) {
    console.log(timesClicked);
  }
};
