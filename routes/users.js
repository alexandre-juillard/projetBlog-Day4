var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/users/register', userCtrl.register);

router.post('/users/login', userCtrl.login);

module.exports = router;
