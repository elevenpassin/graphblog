import React, { Component } from 'react';
import { List, Row, Button, Icon, Col } from 'antd';
const Item = List.Item;

const Controls = () => (
  <Row gutter={16}>
    <Button>
      <Icon type="edit" />
    </Button>
    <Button>
      <Icon type="delete" />
    </Button>
  </Row>
);

export default ({ item }) => (
  <Item actions={[(<Col>
    <Controls />
  </Col>)]}>
    <Row>
      <Item.Meta
        title={<a href="#">{item.title}</a>}
        description={item.truncatedcontent}
      />
    </Row>
  </Item>
);