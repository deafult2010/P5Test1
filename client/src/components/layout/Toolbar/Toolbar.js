import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
// import SignedInLinks from './SignedInLinks';
// import SignedOutLinks from './SignedOutLinks';

var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
let Logo1;
let Logo2;
let Logo3;
let Links;

if (!isIE11) {
  Logo1 = (
    <Link to='/'>
      <h1
        style={{
          fontFamily: 'Rockwell',
          fontWeight: 'bold',
        }}
      >
        <i className='fas fa-comment' /> <i className='fas fa-gamepad' />{' '}
        {'Chat Games'} <i className='fas fa-gamepad' />{' '}
        <i className='fas fa-comment' />
      </h1>
    </Link>
  );
  Logo2 = (
    <Link to='/'>
      <h1
        style={{
          fontFamily: 'Rockwell',
          fontWeight: 'bold',
        }}
      >
        <i className='fas fa-comment' />
        {' CG '} <i className='fas fa-gamepad' />
      </h1>
    </Link>
  );
  Logo3 = (
    <Link to='/'>
      <h1
        style={{
          fontFamily: 'Rockwell',
          fontWeight: 'bold',
        }}
      >
        {' CG '}
      </h1>
    </Link>
  );
  Links = (
    <ul>
      <li>
        <Link to='/'>
          <Button
            className='toolbar-btn'
            style={{
              backgroundColor: 'purple',
              color: 'white',
              border: '2px solid black',
            }}
            size='lg'
          >
            Home
          </Button>
        </Link>
      </li>
      <li>
        <Link to='/blobs'>
          <Button
            className='toolbar-btn'
            style={{
              backgroundColor: 'purple',
              color: 'white',
              border: '2px solid black',
            }}
            size='lg'
          >
            Blobs
          </Button>
        </Link>
      </li>
      <li>
        <Link to='/gol'>
          <Button
            className='toolbar-btn'
            style={{
              backgroundColor: 'purple',
              color: 'white',
              border: '2px solid black',
            }}
            size='lg'
          >
            GoL
          </Button>
        </Link>
      </li>
      <li>
        <Link to='/covid'>
          <Button
            className='toolbar-btn'
            style={{
              backgroundColor: 'purple',
              color: 'white',
              border: '2px solid black',
            }}
            size='lg'
          >
            COVID
          </Button>
        </Link>
      </li>
      <li>
        <Link to='/game1'>
          <Button
            className='toolbar-btn'
            style={{
              backgroundColor: 'purple',
              color: 'white',
              border: '2px solid black',
            }}
            size='lg'
          >
            Game 1
          </Button>
        </Link>
      </li>
      <li>
        <Link to='/about'>
          <Button
            className='toolbar-btn'
            style={{
              backgroundColor: 'purple',
              color: 'white',
              border: '2px solid black',
            }}
            size='lg'
          >
            About
          </Button>
        </Link>
      </li>
    </ul>
  );
} else {
  Logo1 = (
    <a href='/'>
      <i className='fas fa-comment' /> <i className='fas fa-gamepad' />{' '}
      {'Chat Games'} <i className='fas fa-gamepad' />{' '}
      <i className='fas fa-comment' />
    </a>
  );
  Logo2 = (
    <a href='/'>
      <i className='fas fa-comment' />
      {' CG '} <i className='fas fa-gamepad' />
    </a>
  );
  Logo3 = <a href='/'>{' CG '}</a>;
  Links = (
    <ul>
      <li>
        <a href='/'>Home</a>
      </li>
      <li>
        <a href='/blobs'>Blobs</a>
      </li>
      <li>
        <a href='/gol'>GoL</a>
      </li>
      <li>
        <a href='/covid'>COVID</a>
      </li>
      <li>
        <a href='/game1'>Game 1</a>
      </li>
      <li>
        <a href='/about'>About</a>
      </li>
    </ul>
  );
}

const Toolbar = (props) => (
  <header className='toolbar'>
    <nav className='toolbar__navigation'>
      <div className='toolbar__toggle-button'>
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      <div className='toolbar__logo'>{Logo1}</div>
      <div className='toolbar__logo-min'>{Logo2}</div>
      <div className='toolbar__logo-min2'>{Logo3}</div>
      <div className='spacer' />
      <div className='toolbar_navigation-items'>{Links}</div>
    </nav>
  </header>
);

export default Toolbar;
