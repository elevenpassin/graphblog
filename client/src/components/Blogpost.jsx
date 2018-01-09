import React, { Component } from 'react';
import { Alert, Card } from 'antd';
import remarkable from 'remarkable';
import { get } from 'lodash';

const md = new remarkable();

class Blogpost extends Component {
  render() {
    const { 
      title,
      content,
      error,
      loading
    } = this.props;

    const name = get(this.props, 'user.name');
    
    if (error) {
      return <Alert message="Something happened" type="error" />
    }

    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Card loading={loading} title={title} bordered={false} style={{ width: '90vw', margin: '0 auto' }}>
          <p
            style={{
              fontSize: 14,
              color: 'rgba(0, 0, 0, 0.85)',
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            Author: { name }
          </p>
          <p dangerouslySetInnerHTML={{__html: content ? md.render(content) : '' }}>
          </p>
        </Card>
      </div>
    )
  }
}

export default Blogpost;