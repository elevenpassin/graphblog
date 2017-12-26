import React, { Component, Fragment } from 'react';
import 'antd/dist/antd.css';
import logo from './logo.svg';
import './App.css';

import { Route } from 'react-router-dom';

// Components
import Blogposts from './components/Blogposts.jsx';
import Navbar from './components/Navbar.jsx';

// Pages
import Signin from './pages/Signin.jsx';
import Dashboard from './pages/Dashboard.jsx';

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
          this.state.auth === false ? <Signin setAuth={this.setAuth} {...props} /> : <Dashboard />
        )} />
      </div>
    );
  }
}

export default App;
