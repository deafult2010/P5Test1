import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// prevent touchscroll
document.addEventListener(
  'touchmove',
  function(e) {
    e.preventDefault();
  },
  { passive: false }
);
