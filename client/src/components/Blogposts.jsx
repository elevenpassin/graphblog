import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Spin, Icon, Alert } from 'antd';


import BlogpostContainer from './BlogpostContainer.jsx';

const query = gql`
  query {
    allPosts{
      _id
    }
  }
`;


const loader = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Blogposts extends Component {
  render() {
    const { error, loading, allPosts } = this.props.data;
    
    if (error) {
      return <Alert message="Something happened" type="error" />
    }

    if (loading) {
      return <Spin indicator={loader} />;
    }

    return (
      <div>
        {
          allPosts.map((post) => (
            <BlogpostContainer key={post._id} postid={post._id}/>
          ))
        }
      </div>
    )
  }
}

export default graphql(query)(props => <Blogposts {...props}/>);