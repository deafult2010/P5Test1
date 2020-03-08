import React from 'react';
import { Link } from 'react-router-dom';

import '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
// import SignedInLinks from './SignedInLinks';
// import SignedOutLinks from './SignedOutLinks';

const Toolbar = props => (
  <header className='toolbar'>
    <nav className='toolbar__navigation'>
      <div className='toolbar__toggle-button'>
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      <div className='toolbar__logo'>
        <Link to='/'>
          <h1>
            <i className='fas fa-comment' /> <i className='fas fa-gamepad' />{' '}
            {'Chat Games'} <i className='fas fa-gamepad' />{' '}
            <i className='fas fa-comment' />
          </h1>
        </Link>
      </div>
      <div className='toolbar__logo-min'>
        <Link to='/'>
          <h1>
            <i className='fas fa-comment' />
            {' CG '} <i className='fas fa-gamepad' />
          </h1>
        </Link>
      </div>
      <div className='spacer' />
      <div className='toolbar_navigation-items'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/blobs'>Blobs</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
        {/* <SignedInLinks /> */}
        {/* <SignedOutLinks /> */}
      </div>
    </nav>
  </header>
);

export default Toolbar;
