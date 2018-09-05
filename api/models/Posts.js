const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const PostsSchema = new Schema({
    created_at: { type: Date },
    author: { type: String },
    story_title: { type: String },
    story_url: { type: String },
    objectID: { type: String },
})

module.exports = mongoose.model('Posts', PostsSchema); 