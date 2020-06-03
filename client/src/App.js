import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './context/auth';
// import { MenuProvider } from './context/menu';
import AuthRoute from './util/AuthRoute';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import SinglePost from './components/pages/SinglePost';
import Draw from './components/pages/Draw';
import About from './components/pages/About';
import Blobs from './components/pages/Blobs';
import GoL from './components/pages/GoL';
import COVID from './components/pages/COVID';
import Game1 from './components/pages/Game1';
import testSub from './components/pages/testSub';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Fragment>
            <div>
              <main>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <AuthRoute exact path='/login' component={Login} />
                  <AuthRoute exact path='/register' component={Register} />
                  <Route exact path='/posts/:postId' component={SinglePost} />
                  <Route exact path='/draw' component={Draw} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/blobs' component={Blobs} />
                  <Route exact path='/gol' component={GoL} />
                  <Route exact path='/covid' component={COVID} />
                  <Route exact path='/game1' component={Game1} />
                  <Route exact path='/testsub' component={testSub} />
                </Switch>
              </main>
            </div>
          </Fragment>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
