const { GraphQLObjectType, GraphQLString } = require("graphql");
const AuthorType = require("./AuthorType");

const AuthPayload = new GraphQLObjectType({
  name: 'AuthPayload',
  fields: {
    author: { type: AuthorType },
    token: { type: GraphQLString }
  }
})

module.exports = AuthPayload;