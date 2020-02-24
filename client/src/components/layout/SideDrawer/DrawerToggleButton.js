import React from 'react';
import './DrawerToggleButton.css';

const DrawerToggleButton = props => (
  <button id='button1' className='toggle-button' onClick={props.click}>
    <div className='toggle-button__line' />
    <div className='toggle-button__line' />
    <div className='toggle-button__line' />
  </button>
);

export default DrawerToggleButton;
