const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.Number, ref: 'User', required: true },
    tags: [{ type: String }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);