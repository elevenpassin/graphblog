const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('./typeDefs.gql');

const buoyantair = {
  id: 0,
  name: "buoyantair",
  secret: "123"
}

const posts = [
  {
    title: "Post title",
    author: buoyantair,
    comments: [
      {
        author: buoyantair,
        desc: "Not bad",
      },
      {
        author: buoyantair,
        desc: "bad",
      }
    ]
  },
  {
    title: "Another title",
    author: buoyantair,
    comments: [
      {
        author: buoyantair,
        desc: "This is cool",
      }
    ]
  }
];

const resolvers = {
  Query: {
    allPosts: () => posts
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(3001, () => {
  console.log(`
    Server running at http://localhost:3001/
    GraphiQL running at http://localhost:3001/graphiql/
  `)
})
