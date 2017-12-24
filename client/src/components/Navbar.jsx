import React, { Component } from 'react';
import { 
  Menu, 
 } from 'antd';
import {
  Link
} from 'react-router-dom';

export default class Navbar extends Component {
  handleClick = (e) => {
    this.setState({ current: e.key });
  }
  
  constructor(props){
    super(props);
    this.state = {
      current: 'home'
    }
  }

  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[this.state.current]}
        onClick={this.handleClick}
      >
        <Menu.Item key="home">
          <Link to="/">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="account">
          <Link to="/account">
            Login / Signup
          </Link>
        </Menu.Item>
      </Menu>
    )
  }
}

