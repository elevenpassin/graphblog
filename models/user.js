const mongoose = require('mongoose');
mongoose.Promise = Promise; 

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  posts: {
    type: [String],
  },
  comments: {
    type: [String]
  }
}, {
  collection: 'users', 
  timestamps: true
});

module.exports = mongoose.model('user', userSchema);

