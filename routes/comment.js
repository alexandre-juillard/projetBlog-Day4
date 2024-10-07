const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

router.post('/posts/:id/comments', auth, commentCtrl.createComment);

router.put('/:id', auth, commentCtrl.updateComment);

router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;