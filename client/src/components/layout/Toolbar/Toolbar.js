import React from 'react';
import { Link } from 'react-router-dom';
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

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
        <UncontrolledDropdown>
          <DropdownToggle caret className='toolbar-btn' style={{
            backgroundColor: 'purple',
            color: 'white',
            border: '2px solid black',
          }}>
            Games
      </DropdownToggle>
          <DropdownMenu style={{
            backgroundColor: '#6e1e6d',
            color: 'white',
            border: '2px solid black',
            padding: '0px'
          }}>
            <DropdownItem disabled style={{ backgroundColor: 'black', paddingTop: '7px', paddingLeft: '10px', }}><strong style={{ color: 'white' }}>Games</strong></DropdownItem>
            <Link to='/Games'><DropdownItem className='toolbar-btn'><p style={{ color: 'white' }}>
              All Games</p>
            </DropdownItem></Link>
            <DropdownItem disabled style={{ backgroundColor: '#381138', paddingTop: '7px', paddingLeft: '10px', border: '1px solid black' }}><strong style={{ color: 'white' }}>Most Popular</strong></DropdownItem>
            <Link to='/Blobs'><DropdownItem className='toolbar-btn'><p style={{ color: 'white' }}>
              Blobs</p>
            </DropdownItem></Link>
            <Link to='/Draw'><DropdownItem className='toolbar-btn'><p style={{ color: 'white' }}>
              Draw</p>
            </DropdownItem></Link>
            <Link to='/game1'><DropdownItem className='toolbar-btn'><p style={{ color: 'white' }}>
              Stickmen</p>
            </DropdownItem></Link>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
      <li>
        <UncontrolledDropdown>
          <DropdownToggle caret className='toolbar-btn' style={{
            backgroundColor: 'purple',
            color: 'white',
            border: '2px solid black',
          }}>
            PoC
      </DropdownToggle>
          <DropdownMenu style={{
            backgroundColor: '#6e1e6d',
            color: 'white',
            border: '2px solid black',
            padding: '0px'
          }}>
            <DropdownItem disabled style={{ backgroundColor: 'black', paddingTop: '7px', paddingLeft: '10px', }}><strong style={{ color: 'white' }}>Proof of Concept</strong></DropdownItem>
            <Link to='/Pocs'><DropdownItem className='toolbar-btn'><p style={{ color: 'white' }}>
              All PoCs</p>
            </DropdownItem></Link>
            <DropdownItem disabled style={{ backgroundColor: '#381138', paddingTop: '7px', paddingLeft: '10px', border: '1px solid black' }}><strong style={{ color: 'white' }}>Most Popular</strong></DropdownItem>
            <Link to='/gol'><DropdownItem className='toolbar-btn'><p style={{ color: 'white' }}>
              GoL</p>
            </DropdownItem></Link>
            <Link to='/covid'><DropdownItem className='toolbar-btn'><p style={{ color: 'white' }}>
              COVID Curve</p>
            </DropdownItem></Link>
            <Link to='/covidtableau'><DropdownItem className='toolbar-btn'><p style={{ color: 'white' }}>
              COVID Tableau</p>
            </DropdownItem></Link>
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
      <li>
        <UncontrolledDropdown>
          <DropdownToggle caret className='toolbar-btn' style={{
            backgroundColor: 'purple',
            color: 'white',
            border: '2px solid black',
          }}>
            Community
      </DropdownToggle>
          <DropdownMenu style={{
            backgroundColor: '#6e1e6d',
            color: 'white',
            border: '2px solid black',
            padding: '0px'
          }}>
            <DropdownItem disabled style={{ backgroundColor: 'black', paddingTop: '7px', paddingLeft: '10px', }}><strong style={{ color: 'white' }}>Community</strong></DropdownItem>
            <Link to='/Community'><DropdownItem className='toolbar-btn'><p style={{ color: 'white' }}>
              Forum</p>
            </DropdownItem></Link>

            <DropdownItem disabled>Highscores</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
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
        <a href='/draw'>Draw</a>
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
        <a href='/Community'>Community</a>
      </li>
      <li>
        <a href='/about'>About</a>
      </li>
    </ul>
  );
}

const Toolbar = (props) => (
  <header className='toolbar'>
    <div>
      <nav className='toolbar__navigation'>
        <div className='toolbar__toggle-button'>
          <div style={{ marginTop: '15px' }}></div>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className='toolbar__logo'>{Logo1}</div>
        <div className='toolbar__logo-min'>{Logo2}</div>
        <div className='toolbar__logo-min2'>{Logo3}</div>
        <div className='spacer' />
        <div className='toolbar_navigation-items'>{Links}</div>
      </nav>
    </div>
    <div style={{
      position: 'fixed',
      top: '86px',
      left: '0px',
      width: '100%',
      backgroundImage: 'linear-gradient(rgba(0,0,0,1), rgba(82,23,81,0))',
      height: '10px',
      zIndex: '10'
    }}></div>
  </header>
);

export default Toolbar;
