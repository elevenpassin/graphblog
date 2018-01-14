require('dotenv').config();
const { find, filter, truncate } = require('lodash');
const express = require('express');
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const assert = require('assert');
const bodyParser = require('body-parser');
const { promisify } = require('util');
const credential = require('credential')(),
      phash = promisify(credential.hash),
      pverify = promisify(credential.verify);
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('./typeDefs.gql');

const CONNECTION_URL = `mongodb://${process.env.dbuser}:${process.env.dbpassword}@${process.env.dbhost}:46377/graphblog`;

mongoose.connect(CONNECTION_URL, {
  useMongoClient: true
}); 

const { Post, User } = require('./models');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))
  .once('open', console.log.bind(console, `
    =====
    Connected to DB.
    =====
  `));

const resolvers = {
  User: {
    posts: async (user) => await Post.find({ userid: user._id }),
    comments: (user) => filter(comments, { userid: user.userid })
  },
  Comment: {
    user: (comment) => find(users, { userid: comment.userid })
  },
  Post: {
    comments: (post) => filter(comments, { postid: post._id }),
    user: async (post) => await User.findOne({ _id: post.userid }),
    truncatedcontent: (post) => truncate(post.content) 
  },
  Query: {
    allPosts: async () => await Post.find({}),
    getPost: async (_, { postid }) => await Post.findOne({ _id: postid })
  },
  Mutation: {
    addUser: async (_, { name, password }) => {
      const hashedPassword = await phash(password); 
      console.log("hassed it", hashedPassword);
      const newUser = new User({ name, password: hashedPassword });
      return newUser.save((err, user) => {
        if (err) console.error(err);
        return user;
      })
    },
    submitPost: async (_, { title, userid, content, postid }) => {
      if (postid) {
        const editPost = await Post.findById(postid);
        if (editPost) {
          editPost.title = title;
          editPost.content = content;
          return editPost.save((err, post) => {
            if (err) {
              console.error(err);
            }
            return post;
          }) 
        } 
      } 
      else {
        const newPost = new Post({ title, userid, content });
  
        return newPost.save((err, post) => {
          if (err) {
            console.error(err);
          }
          return post;
        })        
      }
    },
    deletePost: async (_, { postid }) => {
      await Post.deleteOne({ _id: postid })
      return 0;
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', async (req, res) => {
  console.log('Got user information: \n', req.body);
  try {
    const { username, password } = req.body;
    const userData = await User.findOne({ name: username  });
    const hashedPassword = await pverify(userData.password, password);
    if (hashedPassword) {
      res.send(JSON.stringify({
        auth: true,
        userid: userData._id
      }));
    } else {
      res.send(JSON.stringify({
        auth: false
      }));
    }
  } catch(e) {
    console.error(e);
  }
})

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(3003, () => {
  console.log(`
    =====
    Server running at http://localhost:3003/
    GraphiQL running at http://localhost:3003/graphiql/
    =====
  `)
});



const users = [
  {
    userid: "0",
    name: "buoyantair",
    secret: "123"
  },
  {
    userid: "1",
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
    title: "Save water!",
    userid: "5a3f88fecd9c9406101645d6",
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
    `,
    comments: []
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