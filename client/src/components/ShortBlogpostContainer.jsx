import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Spin, Icon, Alert, List } from 'antd';

import ShortBlogpost from './ShortBlogpost';

const query = gql`
  query {
    allPosts{
      _id,
      title,
      content,
      truncatedcontent
    }
  }
`;


const loader = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class ShortBlogpostContainer extends Component {
  constructor(props){
    super(props);
  }
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
        <List
          className="list"
          itemLayout="horizontal"
          dataSource={allPosts}
          renderItem={item => (
            <ShortBlogpost item={item} history={this.props.history}/>
          )}
        />
      </div>
    )
  }
}

export default graphql(query)(props => <ShortBlogpostContainer {...props}/>);