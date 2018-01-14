import React, { Component, Fragment } from "react";
import { Col, Row, Button } from "antd";
import { Link, Route } from "react-router-dom";

import ShortBlogpostContainer from "../components/ShortBlogpostContainer.jsx";

// Subpages
import Editor from './Editor';

const UserDashboard = ({ history }) => (
  <Fragment>
    <Row style={{ background: "#ECECEC", padding: "30px" }}>
      <Col span={24}>
        <h1>Dashboard goes here</h1>
      </Col>
    </Row>
    <Row style={{ padding: "30px" }}>
      <Row>
        <Col span={12}>
          <h1>Posts</h1>
        </Col>
        <Col offset={10} span={2}>
          <Link to="/account/new/post">
            <Button>Add Post</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <ShortBlogpostContainer history={history}/>
        </Col>
      </Row>
    </Row>
  </Fragment>
);

export default class Dashboard extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Route path="/account/new/post" render={(props) => <Editor {...props} userid={this.props.userid}/>} />
        <Route exact path="/account" render={() => <UserDashboard {...this.props}/>} /> 
      </div>
    );
  }
}
