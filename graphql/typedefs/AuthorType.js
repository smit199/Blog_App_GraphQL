const { GraphQLObjectType, GraphQLID, graphqlSync, GraphQLString } = require("graphql");

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  }
})

module.exports = AuthorType;