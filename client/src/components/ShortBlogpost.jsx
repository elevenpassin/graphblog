import React from 'react';
import { List, Row, Button, Icon, Col } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
const Item = List.Item;


const Controls = ({ _id, mutate}) => (
  <Row gutter={16}>
    <Button>
      <Icon type="edit" />
    </Button>
    <Button
      onClick={() => mutate({
        variables: {
          postid: _id
        }
      })}
    >
      <Icon type="delete" />
    </Button>
  </Row>
);


const ShortBlogpost =  ({ item, mutate }) => (
  <Item actions={[(<Col>
    <Controls _id={item._id} mutate={mutate}/>
  </Col>)]}>
    <Row>
      <Item.Meta
        title={<a href="/">{item.title}</a>}
        description={item.truncatedcontent}
      />
    </Row>
  </Item>
);

const deletePost = gql`
  mutation deletePost($postid: String!){
    deletePost(postid: $postid)
  }
`;

export default graphql(deletePost)(ShortBlogpost);
