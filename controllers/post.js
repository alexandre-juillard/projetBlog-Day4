const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Counter = require('../models/Counter');

async function getNextSequenceValue(sequenceName) {
    const sequenceDocument = await Counter.findByIdAndUpdate(
        sequenceName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return sequenceDocument.seq;
}

exports.createPost = async (req, res, next) => {
    const { title, content, author, tags } = req.body;
    const postId = await getNextSequenceValue('postId');
    const post = new Post({
        _id: postId,
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

exports.commentPost = async (req, res, next) => {
    const { content } = req.body;
    const commentId = await getNextSequenceValue('commentId');
    const comment = new Comment({
        _id: commentId,
        comment_text: content,
        post_id: req.params.id,
        author: req.auth.userId
    });
    comment.save()
        .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}