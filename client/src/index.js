import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import App from './App';


const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

ReactDOM.render((
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
), document.getElementById('root'));
registerServiceWorker();
