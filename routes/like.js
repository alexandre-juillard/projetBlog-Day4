const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const Like = require('../models/Like');
const likeCtrl = require('../controllers/like');

router.post('/', auth, likeCtrl.likePost);

router.delete('/:id', auth, likeCtrl.unlikePost);

router.get('/', auth, likeCtrl.getAllLikes);

module.exports = router;