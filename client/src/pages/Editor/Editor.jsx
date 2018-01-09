import React, { Component, Fragment } from "react";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import remarkable from 'remarkable';
import { Col, Row, Button } from "antd";
import "./Editor.css";

const md = new remarkable();

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Enter your title",
      content: "Enter your post here!"
    };
  }

  onChange = e => {
    switch (e.target.name) {
      case "title":
        this.setState({ title: e.target.value });
        break;
      case "content":
        this.setState({ content: e.target.value });
        break;
      default:
        break;
    }
  };

  publishPost = async (e) => {
    e.preventDefault();
    const { title, content } = this.state;
    const { userid } = this.props;
  
    const resp = await this.props.mutate({
      variables: {
        title,
        userid,
        content
      }
    })

    if (resp.data.addPost._id) {
      this.props.history.push('/account');
    }
  }

  render() {
    const { title, content } = this.state;
    return (
      <div className="editor-page">
        <h1> Add new post </h1>
        <form className="editor-main" onSubmit={this.publishPost}>
          <Row gutter={24} className="editor-title">
            <Col span={12}>
              <input
                type="text"
                name="title"
                placeholder="Enter your title"
                onChange={this.onChange}
              />
            </Col>
            <Col span={12}>
              <h1>{title}</h1>
            </Col>
          </Row>
          <Row gutter={24} className="editor-content">
            <Col span={12}>
              <textarea
                name="content"
                cols="30"
                rows="10"
                onChange={this.onChange}
                placeholder="Enter your post here!"
              />
            </Col>
            <Col span={12} dangerouslySetInnerHTML={{__html: md.render(content) }}></Col>
          </Row>
          <Row gutter={24} className="greybackground">
            <Col span={2} offset={22}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Publish
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

const submitPost = gql`
  mutation addPost($title: String!, $userid: String!, $content: String!){
    addPost(title: $title, userid: $userid, content: $content) {
      _id
    }
  }
`;

export default graphql(submitPost)(Editor);
