const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

router.post('/posts/:id/comments', commentCtrl.createComment);

router.put('/:id', commentCtrl.updateComment);

router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;