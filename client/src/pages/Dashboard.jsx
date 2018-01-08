import React, { Component } from 'react';
import { Col, Row } from 'antd';

import ShortBlogpostContainer from '../components/ShortBlogpostContainer.jsx';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Row style={{ background: '#ECECEC', padding: '30px' }}>
          <Col span={24}>
            <h1>
              Dashboard goes here
            </h1>
          </Col>
        </Row>
        <Row style={{ padding: '30px' }}>
          <h1>Posts</h1>
          <Row>
            <Col span={12}>
              <ShortBlogpostContainer />
            </Col>
          </Row>
        </Row>
      </div>
    )
  }
}
