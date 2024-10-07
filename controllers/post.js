const Post = require('../models/Post');

exports.createPost = (req, res, next) => {
    const { title, content, author, tags } = req.body;
    const post = new Post({
        title: title,
        content: content,
        author: req.auth.userId,
        tags: tags
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
}

exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
}

exports.updatePost = (req, res, next) => {
    Post.updateOne({ _id: req.params }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Post modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deletePost = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
        .catch(error => res.status(400).json({ error }));
}