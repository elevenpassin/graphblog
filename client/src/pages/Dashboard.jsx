import React, { Component, Fragment } from "react";
import { Col, Row, Button } from "antd";
import { Link, Route } from "react-router-dom";

import ShortBlogpostContainer from "../components/ShortBlogpostContainer.jsx";

// Subpages
import Editor from './Editor.jsx';

const UserDashboard = (
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
          <Link to="/new/post">
            <Button>Add Post</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <ShortBlogpostContainer />
        </Col>
      </Row>
    </Row>
  </Fragment>
);

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Route path="/new/post" component={Editor} />
        <Route path="/" render={() => UserDashboard} /> 
      </div>
    );
  }
}
