const mongoose = require('mongoose');
mongoose.Promise = Promise;

const { ObjectID } = require('mongodb');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  postid: {
    type: String,
    required: true
  },
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
}, {
  collection: 'posts', timestamps: true
});

module.exports =  mongoose.model('posts', postSchema);