import React, { Component } from 'react';
import { Col, Row } from 'antd';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return (
      <div>
        <Row>
          <Col span={12}>
            Editor goes here
          </Col>
          <Col span={12}>
            Preview goes here
          </Col>
        </Row>
      </div>
    )
  }
}

export default Editor;