import React from 'react';
import { List, Row, Button, Icon, Col } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
const Item = List.Item;


const Controls = ({ mutate, history, item}) => (
  <Row gutter={16}>
    <Button
      onClick={() => history.push('/account/new/post', { post : item, from: 'dashboard' })}
    >
      <Icon type="edit" />
    </Button>
    <Button
      onClick={() => mutate({
        variables: {
          postid: item._id
        }
      })}
    >
      <Icon type="delete" />
    </Button>
  </Row>
);


const ShortBlogpost =  ({ item, mutate, history }) => (
  <Item actions={[(<Col>
    <Controls mutate={mutate} history={history} item={item}/>
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
