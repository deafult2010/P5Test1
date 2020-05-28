import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import ApolloProvider from './ApolloProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(ApolloProvider, document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
