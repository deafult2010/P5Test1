import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Blobs from './components/pages/Blobs';
import GoL from './components/pages/GoL';
import COVID from './components/pages/COVID';
import Game1 from './components/pages/Game1';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div>
            <main>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/blobs' component={Blobs} />
                <Route exact path='/gol' component={GoL} />
                <Route exact path='/covid' component={COVID} />
                <Route exact path='/game1' component={Game1} />
              </Switch>
            </main>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
