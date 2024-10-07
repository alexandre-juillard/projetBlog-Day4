const Comment = require('../models/Comment');

exports.createComment = (req, res, next) => {
    const { content, author, post_id } = req.body;
    const comment = new Comment({
        content_text: content,
        author: req.auth.userId,
        post_id: req.body.postId
    });
    comment.save()
        .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.updateComment = (req, res, next) => {
    Comment.updateOne({ _id: req.params }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteComment = (req, res, next) => {
    Comment.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
        .catch(error => res.status(400).json({ error }));
}