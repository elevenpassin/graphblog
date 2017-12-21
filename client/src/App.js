import React, { Component } from 'react';
import 'antd/dist/antd.css';
import logo from './logo.svg';
import './App.css';

import { Row, Col } from 'antd';


import Blogposts from './components/Blogposts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">GraphQL Based blog</h1>
        </header>
        <main>
          <Blogposts/>
        </main>
      </div>
    );
  }
}

export default App;
