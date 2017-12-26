import React, { Component, Fragment } from 'react';
import 'antd/dist/antd.css';
import logo from './logo.svg';
import './App.css';

import { Route } from 'react-router-dom';

import Account from './pages/Account.jsx';

import Blogposts from './components/Blogposts.jsx';
import Navbar from './components/Navbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    }

    this.setAuth = this.setAuth.bind(this);
  }

  setAuth(auth) {
    this.setState({ auth })
  }

  render() {
    return (
      <div className="App">
        <Route path="/" render={(props) => (
          <Navbar setAuth={this.setAuth} auth={this.state.auth} {...props} />
        )} />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">GraphQL Based blog</h1>
        </header>
        <Route exact path="/" component={Blogposts} />
        <Route exact path="/account" render={(props) => (
          this.state.auth === false ? <Account setAuth={this.setAuth} {...props} /> : null
        )} />
      </div>
    );
  }
}

export default App;
