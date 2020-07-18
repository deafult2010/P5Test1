import React, { useEffect } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch4 from './sketch4';
import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

import 'bootstrap/dist/css/bootstrap.min.css';

const COVID = () => {

  // On ComponentDidMount
  useEffect(() => {

    // Scroll to top.
    window.scrollTo(0, 1);

  }, []);

  return (
    <div className='container'>
      <MenuBar />
      <Navbar />
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
