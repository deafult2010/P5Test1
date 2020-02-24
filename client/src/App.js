import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import Navbar from './components/layout/Navbar';
import Toolbar from './components/layout/Toolbar/Toolbar';
import SideDrawer from './components/layout/SideDrawer/SideDrawer';
import Backdrop from './components/layout/Backdrop/Backdrop';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Blobs from './components/pages/Blobs';
import './App.css';

const App = () => {
  let [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(prevState => ({
      // ...prevState,
      sideDrawerOpen: !prevState.sideDrawerOpen
    }));
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  let backdrop;

  if (sideDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }
  return (
    <Router>
      <Fragment>
        {/* <Navbar /> */}
        <Toolbar drawerClickHandler={drawerToggleClickHandler} />
        <SideDrawer show={sideDrawerOpen} click={backdropClickHandler} />
        {backdrop}
        <div className='container'>
          <main style={{ marginTop: '64px' }}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/blobs' component={Blobs} />
            </Switch>
          </main>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
