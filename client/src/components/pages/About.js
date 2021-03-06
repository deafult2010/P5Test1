import React, { useEffect } from 'react';
import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

const About = () => {

  // On ComponentDidMount
  useEffect(() => {

    // Scroll to top.
    window.scrollTo(0, 1);

  }, []);

  return (
    <div className='container'>
      <MenuBar />
      <Navbar />
      <h1>About This App</h1>
      <p className='my-1'>
        This is a full stack react app for chat games made by Tom J.
      </p>
      <p className='bg-dark p'>
        <strong>Version: </strong>1.0.0
      </p>
      <a href='http://github.com/deafult2010/P5Test1'>
        <span className='fab fa-github' /> Github
      </a>
    </div>
  );
};

export default About;
