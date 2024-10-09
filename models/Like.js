const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    _id: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.Number, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.Number, ref: 'Post', required: true }
});

module.exports = mongoose.model('Like', likeSchema);