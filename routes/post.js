const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const Post = require('../models/Post');
const postCtrl = require('../controllers/post');

router.post('/', auth, postCtrl.createPost);

router.get('/', auth, postCtrl.getAllPosts);

router.get('/:id', auth, postCtrl.getOnePost);

router.put('/:id', auth, postCtrl.updatePost);

router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;