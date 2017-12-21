import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Alert, Card } from 'antd';

import Blogpost from './Blogpost';

class BlogpostContainer extends Component {
  render() {
    return (
      <Blogpost { ...this.props.data.getPost } error={this.props.data.error} loading={this.props.data.loading}/>
    )
  }
}

export default graphql(gql`
query ($postid: Int){
  getPost(postid: $postid) {
    title,
    user{
      name
    }
    content
    comments{
      commentid
    }
  }
}
`)(BlogpostContainer);