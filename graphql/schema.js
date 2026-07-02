const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } = require("graphql");
const AuthPayload = require("./typedefs/AuthPayload");
const authorModel = require('./../models/authorModel');
const blogModel = require('../models/blogModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const BlogType = require("./typedefs/BlogType");

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve(_, __, { author }) {
        console.log(author);
        if(!author) throw new Error('Unauthorized')
        return 'hello';
      }
    },

    getMyBlogs: {
      type: new GraphQLList(BlogType),
      async resolve(parent, args, { author }) {
        if(!author) throw new Error('Unauthorized, login as author to get your blogs');
        return await blogModel.find({ authorId: author.id });
      }
    },

    getMyBlogById: {
      type: BlogType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, { id }, { author }) {
        if(!author) throw new Error('Unauthorized, login as author to get your blogs');
        const blog = await blogModel.findById(id);
        if(blog.authorId.toString() !== author.id) throw new Error('this blog does not belong to you')
        return blog;
      }
    },

    getAllBlogs: {
      type: new GraphQLList(BlogType),
      async resolve() {
        return await blogModel.find();
      }
    },

    getBlogById: {
      type: BlogType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, { id }, { author }) {
        return await blogModel.findById(id);
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    registerAuthor: {
      type: AuthPayload,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, { name, email, password }) {
        const newAuthor = authorModel.create({ name, email, password });
        const token = jwt.sign({ id: newAuthor._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });
        return {
          author: newAuthor,
          token,
        }
      }
    },

    loginAuthor: {
      type: AuthPayload,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, { email, password }) {
        const author = await authorModel.findOne({ email }).select('+password');
        if(!author) throw new Error('author with this email not found.');
        if(!await bcrypt.compare(password, author.password))  throw new Error('Wrong password');
        const token = jwt.sign({ id: author._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });
        return {
          author,
          token,
        }
      }
    },

    addBlog: {
      type: BlogType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, { title, content }, { author }) {
        if(!author) throw new Error('Unauthorized to create blog');
        const blog = await blogModel.create({ title, content, authorId: author.id });
        return blog;
      }
    },

    updateBlog: {
      type: BlogType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        content: { type: GraphQLString }
      },
      async resolve(parent, { id, title, content }, { author }) {
        if(!author) throw new Error('Unauthorized to update blog');
        const blog = await blogModel.findById(id);
        if(blog.authorId.toString() !== author.id) throw new Error('Unauthorized to update others blog')
        const updatedBlog = await blogModel.findByIdAndUpdate(id, { title, content }, { new: true, runValidators: true});
        if(!updatedBlog)  throw new Error('Blog with given id does not exist.')
        return updatedBlog;
      }
    },

    deleteBlog: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, { id }, { author }) {
        if(!author) throw new Error('Unauthorized to delete blog');
        const blog = await blogModel.findById(id);
        if(blog.authorId.toString() !== author.id) throw new Error('Unauthorized to delete others blog')
        const deletedBlog = await blogModel.findByIdAndDelete(id);
        if(!deletedBlog)  throw new Error('Blog with given id does not exist.')
        return 'Blog deleted successfully';
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})