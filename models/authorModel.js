const mongoose = require("mongoose");
const validator = require('validator')
const bcrypt = require('bcryptjs')

const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Provide your name']
  },
  email: {
    type: String,
    required: [true, 'Provide your email'],
    unique: [true, 'Author with this email already exist'],
    validate: [validator.isEmail, 'Invalid email address']
  },
  password: {
    type: String,
    required: [true, 'Provide password'],
    select: false
  }
});

authorSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 12);
});

const Author = mongoose.model('Authors', authorSchema);
module.exports = Author;