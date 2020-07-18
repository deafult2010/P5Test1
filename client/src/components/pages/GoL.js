import React, { useEffect } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch3 from './sketch3';
import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

import 'bootstrap/dist/css/bootstrap.min.css';

const GoL = () => {

  // On ComponentDidMount
  useEffect(() => {

    // Scroll to top.
    window.scrollTo(0, 1);

  }, []);

  return (
    <div className='container'>
      <MenuBar />
      <Navbar />
      <a
        style={{ fontSize: '30px' }}
        href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'
      >
        Game of Life
      </a>{' '}
      <P5Wrapper sketch={sketch3} />
    </div>
  );
};

export default GoL;
