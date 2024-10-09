const Like = require('../models/Like');
const Counter = require('../models/Counter');

async function getNextSequenceValue(sequenceName) {
    const sequenceDocument = await Counter.findByIdAndUpdate(
        sequenceName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return sequenceDocument.seq;
}

exports.likePost = async (req, res, next) => {
    const likeId = await getNextSequenceValue('likeId');
    const like = new Like({
        _id: likeId,
        user: req.auth.userId,
        post: req.params.id
    });
    await like.save()
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