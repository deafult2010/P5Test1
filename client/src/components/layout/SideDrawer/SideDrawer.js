import React from 'react';
import { Link } from 'react-router-dom';
import './SideDrawer.css';

const SideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <Link to='/' onClick={props.click}>
            Home
          </Link>
        </li>
        <li>
          <Link to='/blobs' onClick={props.click}>
            Blobs
          </Link>
        </li>
        <li>
          <Link to='/about' onClick={props.click}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
