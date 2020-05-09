import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import Navbar from './components/layout/Navbar';
import Toolbar from './components/layout/Toolbar/Toolbar';
import SideDrawer from './components/layout/SideDrawer/SideDrawer';
import Backdrop from './components/layout/Backdrop/Backdrop';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Blobs from './components/pages/Blobs';
import GoL from './components/pages/GoL';
import COVID from './components/pages/COVID';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  let [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen((prevState) => ({
      // ...prevState,
      sideDrawerOpen: !prevState.sideDrawerOpen,
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
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar /> */}
          <Toolbar drawerClickHandler={drawerToggleClickHandler} />
          <SideDrawer show={sideDrawerOpen} click={backdropClickHandler} />
          {backdrop}
          <div className='container'>
            {/* <main style={{ marginTop: '64px' }}> */}
            <main>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/blobs' component={Blobs} />
                <Route exact path='/gol' component={GoL} />
                <Route exact path='/covid' component={COVID} />
              </Switch>
            </main>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
