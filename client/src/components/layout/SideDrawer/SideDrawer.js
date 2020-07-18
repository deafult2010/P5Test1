import React from 'react';
import { Link } from 'react-router-dom';
import './SideDrawer.css';
import { Card } from 'reactstrap';

const SideDrawer = (props) => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <Link to='/draw' onClick={props.click}>
            <Card style={{ margin: '0px' }}>Draw</Card>
          </Link>
        </li>
        <li>
          <Link to='/blobs' onClick={props.click}>
            <Card style={{ margin: '0px' }}>Blobs</Card>
          </Link>
        </li>
        <li>
          <Link to='/gol' onClick={props.click}>
            <Card style={{ margin: '0px' }}>GoL</Card>
          </Link>
        </li>
        <li>
          <Link to='/covid' onClick={props.click}>
            <Card style={{ margin: '0px' }}>COVID</Card>
          </Link>
        </li>
        <li>
          <Link to='/community' onClick={props.click}>
            <Card style={{ margin: '0px' }}>Community</Card>
          </Link>
        </li>
        <li>
          <Link to='/game1' onClick={props.click}>
            <Card style={{ margin: '0px' }}>Game 1</Card>
          </Link>
        </li>
        <li>
          <Link to='/about' onClick={props.click}>
            <Card style={{ margin: '0px' }}>About</Card>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
