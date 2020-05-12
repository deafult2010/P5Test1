import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch4 from './sketch4';

import 'bootstrap/dist/css/bootstrap.min.css';

const COVID = () => {
  return (
    <div>
      {/* <a
        style={{ fontSize: '30px' }}
        href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'
      >
        Game of Life
      </a>{' '} */}
      <h1>COVID SIR Model</h1>
      <h4>Population against Time(weeks)</h4>
      <div id='myTargetDiv' style={{ position: 'relative' }}>
        <P5Wrapper sketch={sketch4} />
      </div>
    </div>
  );
};

export default COVID;
