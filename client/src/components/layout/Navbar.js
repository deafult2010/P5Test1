import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon1, icon2 }) => {
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon1} /> <i className={icon2} /> {title}{' '}
        <i className={icon2} /> <i className={icon1} />
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/blobs'>Blobs</Link>
        </li>
        <li>
          <Link to='/gol'>GoL</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Chat Games',
  icon2: 'fas fa-gamepad',
  icon1: 'fas fa-comment',
};

export default Navbar;
