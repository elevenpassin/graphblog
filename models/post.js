const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  userid: {
    type: String, 
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comments: []
}, {
  collection: 'posts', 
  timestamps: true
});

module.exports =  mongoose.model('post', postSchema);