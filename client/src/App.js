import React, { Component } from 'react';
import 'antd/dist/antd.css';
import logo from './logo.svg';
import './App.css';

import { Route } from 'react-router-dom';

import Account from './pages/Account.jsx';

import Blogposts from './components/Blogposts.jsx';
import Navbar from './components/Navbar.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Navbar} />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">GraphQL Based blog</h1>
        </header>
        <Route exact path="/" component={Blogposts} />
        <Route exact path="/account" component={Account} />
      </div>
    );
  }
}

export default App;
