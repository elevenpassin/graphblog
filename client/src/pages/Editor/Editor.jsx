import React, { Component, Fragment } from "react";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import remarkable from 'remarkable';
import { Col, Row, Button } from "antd";
import "./Editor.css";

const md = new remarkable();

const submitPost = gql`
  mutation submitPost($title: String!, $userid: String!, $content: String!, $postid: String){
    submitPost(title: $title, userid: $userid, content: $content, postid: $postid) {
      _id
    }
  }
`;

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "Add new post",
      title: "Enter your title",
      content: "Enter your post here!",
      postid: '',
      editing: false
    };
  }

  componentDidMount() {
    const routeState = this.props.location.state
    if (routeState) {
      const { from, post } = routeState;

      if (from === 'dashboard') {
        this.setState({
          pageTitle: 'Edit your post',
          title: post.title,
          content: post.content,
          postid: post._id,
          editing: true
        })
      }
    }
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
    const { postid, title, content, editing } = this.state;
    const { userid } = this.props;
  
    const resp = await this.props.mutate({
      variables: {
        title,
        userid,
        content,
        postid 
      }
    })

    if (resp.data.submitPost._id) {
      this.props.history.push('/account');
    }
  }

  render() {
    const { title, content, pageTitle, editing } = this.state;
    // const { postID } = this.props.location.state;
    
    return (
      <div className="editor-page">
        <h1> { pageTitle } </h1>
        <form className="editor-main" onSubmit={this.publishPost}>
          <Row gutter={24} className="editor-title">
            <Col span={12}>
              <input
                type="text"
                name="title"
                placeholder="Enter your title"
                onChange={this.onChange}
                value={title}
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
                value={content}
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





export default graphql(submitPost)(Editor);
