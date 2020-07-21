import React from 'react';
import { Link } from 'react-router-dom';
import './SideDrawer.css';
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const SideDrawer = (props) => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <Link to='/'>
          <li style={{ padding: '20px', margin: '0px', backgroundColor: '#521751', color: 'white', fontSize: '20px' }}>
            <i className='fas fa-comment' />
            {'Chat Games'} <i className='fas fa-gamepad' />{' '}
          </li>
        </Link>
        <hr />
        <li>
          <UncontrolledDropdown direction="right">
            <DropdownToggle caret className='toolbar-btn' style={{
              backgroundColor: 'purple',
              color: 'white',
              border: '2px solid black',
              width: '170px'
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
              <DropdownItem className='toolbar-btn'><Link to='/Games'><p style={{ color: 'white' }}>
                All Games</p>
              </Link></DropdownItem>
              <DropdownItem disabled style={{ backgroundColor: '#381138', paddingTop: '7px', paddingLeft: '10px', border: '1px solid black' }}><strong style={{ color: 'white' }}>Most Popular</strong></DropdownItem>
              <DropdownItem className='toolbar-btn'><Link to='/Blobs'><p style={{ color: 'white' }}>
                Blobs</p>
              </Link></DropdownItem>
              <DropdownItem className='toolbar-btn'><Link to='/Draw'><p style={{ color: 'white' }}>
                Draw</p>
              </Link></DropdownItem>
              <DropdownItem className='toolbar-btn'><Link to='/game1'><p style={{ color: 'white' }}>
                Stickmen</p>
              </Link></DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </li>
        <li>
          <UncontrolledDropdown direction="right">
            <DropdownToggle caret className='toolbar-btn' style={{
              backgroundColor: 'purple',
              color: 'white',
              border: '2px solid black',
              width: '170px'
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
              <DropdownItem className='toolbar-btn'><Link to='/Pocs'><p style={{ color: 'white' }}>
                All PoCs</p>
              </Link></DropdownItem>
              <DropdownItem disabled style={{ backgroundColor: '#381138', paddingTop: '7px', paddingLeft: '10px', border: '1px solid black' }}><strong style={{ color: 'white' }}>Most Popular</strong></DropdownItem>
              <DropdownItem className='toolbar-btn'><Link to='/gol'><p style={{ color: 'white' }}>
                GoL</p>
              </Link></DropdownItem>
              <DropdownItem className='toolbar-btn'><Link to='/covid'><p style={{ color: 'white' }}>
                COVID Curve</p>
              </Link></DropdownItem>
              <DropdownItem className='toolbar-btn'><Link to='/covidtableau'><p style={{ color: 'white' }}>
                COVID Tableau</p>
              </Link></DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </li>
        <li>
          <UncontrolledDropdown direction="right">
            <DropdownToggle caret className='toolbar-btn' style={{
              backgroundColor: 'purple',
              color: 'white',
              border: '2px solid black',
              width: '170px'
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
              <DropdownItem className='toolbar-btn'><Link to='/Community'><p style={{ color: 'white' }}>
                Forum</p>
              </Link></DropdownItem>

              <DropdownItem disabled>Highscores</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </li>
        <li>
          <Link to='/about' onClick={props.click}>
            <Button className='toolbar-btn' style={{
              backgroundColor: 'purple',
              color: 'white',
              border: '2px solid black', margin: '0px', width: '170px'
            }}>About</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
