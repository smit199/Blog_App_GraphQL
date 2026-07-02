const { GraphQLObjectType, GraphQLID, graphqlSync, GraphQLString } = require("graphql");
const AuthorType = require('./AuthorType');
const authorModel = require('../../models/authorModel')

const BlogType = new GraphQLObjectType({
  name: 'Blog',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: GraphQLID },
    author: {
      type: AuthorType,
      async resolve(parent) {
        const author = await authorModel.findById(parent.authorId);
        return author;
      }
    }
  }
})

module.exports = BlogType;