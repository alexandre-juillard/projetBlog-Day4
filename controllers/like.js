const Like = require('../models/Like');

exports.likePost = (req, res, next) => {
    const like = new Like({
        user: req.auth.userId,
        post: req.params.id
    });
    like.save()
        .then(() => res.status(201).json({ message: 'J\'aime !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.unlikePost = (req, res, next) => {
    Like.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Je n\'aime pas !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllLikes = (req, res, next) => {
    Like.find()
        .then(likes => res.status(200).json(likes))
        .catch(error => res.status(400).json({ error }));
}