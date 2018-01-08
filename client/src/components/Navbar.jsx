import React, { Component } from 'react';
import { 
  Menu, 
 } from 'antd';
import {
  Link
} from 'react-router-dom';

const SubMenu = Menu.SubMenu;


export default class Navbar extends Component {
  
  
  constructor(props){
    super(props);
    this.state = {
      current: this.props.location.pathname
    }
  }

  handleClick = (e) => {
    if (e.key === "signout") {
      this.props.setAuth(false);
      this.props.history.push('/');
      this.setState({ current: '/' });
    } else {
      this.setState({ current: e.key });
    }
    
  }

  render() {

    const { auth } = this.props;

    return (
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[this.state.current]}
        onClick={this.handleClick}
      >
        <Menu.Item key="/">
          <Link to="/">
            Home
          </Link>
        </Menu.Item>
        {
          auth ? (
            <SubMenu title={<span>Account</span>}>
              <Menu.Item key="/account">
                <Link to={"/account"}>
                  Dashboard
                </Link>
              </Menu.Item>
              <Menu.Item key="signout" >
                <Link to={"/"}>
                  Sign out
                </Link>
              </Menu.Item>
            </SubMenu>
          ) : (
            <Menu.Item key="/account">
              <Link to={"/account"}>
                Sign in
              </Link>
            </Menu.Item>
          )
        }
      </Menu>
    )
  }
}

