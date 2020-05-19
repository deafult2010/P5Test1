import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch3 from './sketch3';
import Navbar from '../layout/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';

const GoL = () => {
  return (
    <div className='container'>
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
