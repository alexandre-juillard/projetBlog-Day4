const mongoose = require('mongoose');
const { create } = require('./User');

const commentSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    comment_text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.Number, ref: 'User', required: true },
    post_id: { type: mongoose.Schema.Types.Number, ref: 'Post', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);