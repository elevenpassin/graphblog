const { find, filter } = require('lodash');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('./typeDefs.gql');

const dbUrl = 'mongodb://localhost:27017';
const dbName = 'blog';

const app = express();





MongoClient.connect(dbUrl, (err, client) => {
  assert.equal(null, err);
  console.log(`
      =====
      Successfully connected to the DB
      =====
  `);

  const db = client.db(dbName);
  const usersCollection = db.collection('users');
  const postsCollection = db.collection('posts');
  const commentsCollection = db.collection('comments');

  function getAllDocuments(col) {
    col.find({}).toArray((err, docs) => {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      return docs;
    })
  }

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
      allPosts: () => posts,
      getPost: (_, { postid }) => {
        return find(posts, { postid })
      }
    }
  }
  
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  app.get('/ja', (req, res) => {
    res.send('JA JA JA');
  });

  app.listen(3001, () => {
    console.log(`
      =====
      Server running at http://localhost:3001/
      GraphiQL running at http://localhost:3001/graphiql/
      =====
    `)
  })

  client.close();
})

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
    content: `
    Lorem ipsum dolor sit amet consectetur adipiscing elit fringilla, 
    massa scelerisque mus quam nulla lobortis litora, 
    nostra placerat felis potenti lacus dictumst bibendum. 
    Aliquam venenatis sollicitudin fusce quis congue id rhoncus ac nunc, 
    vivamus feugiat mauris lectus ridiculus nulla libero sagittis primis, 
    natoque leo suspendisse proin at curabitur suscipit cras. 
    Mus at curae tempor blandit suspendisse molestie tortor eget ornare aliquam, 
    aliquet eros luctus nisi suscipit venenatis platea senectus posuere, 
    interdum proin a in primis rhoncus tellus dapibus litora.
    `
  },
  {
    title: "Another title",
    userid: 0,
    postid: 1,
    content: `
    Lorem ipsum dolor sit amet consectetur adipiscing elit fringilla, 
    massa scelerisque mus quam nulla lobortis litora, 
    nostra placerat felis potenti lacus dictumst bibendum. 
    Aliquam venenatis sollicitudin fusce quis congue id rhoncus ac nunc, 
    vivamus feugiat mauris lectus ridiculus nulla libero sagittis primis, 
    natoque leo suspendisse proin at curabitur suscipit cras. 
    Mus at curae tempor blandit suspendisse molestie tortor eget ornare aliquam, 
    aliquet eros luctus nisi suscipit venenatis platea senectus posuere, 
    interdum proin a in primis rhoncus tellus dapibus litora.
    `
  },
  {
    title: "Save the web",
    userid: 0,
    postid: 2,
    content: `
    Lorem ipsum dolor sit amet consectetur adipiscing elit fringilla, 
    massa scelerisque mus quam nulla lobortis litora, 
    nostra placerat felis potenti lacus dictumst bibendum. 
    Aliquam venenatis sollicitudin fusce quis congue id rhoncus ac nunc, 
    vivamus feugiat mauris lectus ridiculus nulla libero sagittis primis, 
    natoque leo suspendisse proin at curabitur suscipit cras. 
    Mus at curae tempor blandit suspendisse molestie tortor eget ornare aliquam, 
    aliquet eros luctus nisi suscipit venenatis platea senectus posuere, 
    interdum proin a in primis rhoncus tellus dapibus litora.
    `
  },
  {
    title: "Decentralized web is the way",
    userid: 0,
    postid: 3,
    content: `
    Lorem ipsum dolor sit amet consectetur adipiscing elit fringilla, 
    massa scelerisque mus quam nulla lobortis litora, 
    nostra placerat felis potenti lacus dictumst bibendum. 
    Aliquam venenatis sollicitudin fusce quis congue id rhoncus ac nunc, 
    vivamus feugiat mauris lectus ridiculus nulla libero sagittis primis, 
    natoque leo suspendisse proin at curabitur suscipit cras. 
    Mus at curae tempor blandit suspendisse molestie tortor eget ornare aliquam, 
    aliquet eros luctus nisi suscipit venenatis platea senectus posuere, 
    interdum proin a in primis rhoncus tellus dapibus litora.
    `
  }
];