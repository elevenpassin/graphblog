const { find, filter } = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('./typeDefs.gql');

const users = [
  {
    userid: 0,
    name: "buoyantair",
    secret: "123"
  },
  {
    userid: 1,
    name: "raxx",
    secret: "456"
  }
];

const comments = [
  {
    commentid: 0,
    postid: 1,
    userid: 1,
    desc: "This is cool",
  },
  {
    commentid: 1,
    postid: 0,
    userid: 0,
    desc: "Not bad",
  },
  {
    commentid: 2,
    postid: 0,
    userid: 1,
    desc: "bad",
  }
];

const posts = [
  {
    title: "Post title",
    userid: 0,
    postid: 0,
  },
  {
    title: "Another title",
    userid: 0,
    postid: 1,
  }
];

const resolvers = {
  User: {
    posts: (user) => filter(posts, { userid: user.userid }),
    comments: (user) => filter(comments, { userid: user.userid })
  },
  Comment: {
    user: (comment) => find(users, { userid: comment.userid })
  },
  Post: {
    user: (post) => find(users, { userid: post.userid }),
    comments: (post) => filter(comments, { postid: post.postid })
  },
  Query: {
    allPosts: () => posts
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

app.get('/ja', (req, res) => {
  res.send('JA JA JA');
})

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(3001, () => {
  console.log(`
    Server running at http://localhost:3001/
    GraphiQL running at http://localhost:3001/graphiql/
  `)
})
