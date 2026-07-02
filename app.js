const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const authMiddleware = require('./util/authMiddleware')

const app = express();
app.use('/graphql', graphqlHTTP((req, res, graphQLParams) => {
  return {
    schema,
    context: {
      author: authMiddleware(req)
    },
    graphiql: { headerEditorEnabled: true }
  }
}))

module.exports = app;