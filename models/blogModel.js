const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Provide blog title']
  },
  content: {
    type: String,
    required: [true, 'Provide content of blog']
  },
  authorId: {
    type: mongoose.Types.ObjectId,
    ref: 'Authors'
  }
});

const Blog = mongoose.model('Blogs', blogSchema);
module.exports = Blog;