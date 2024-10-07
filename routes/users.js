var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

router.get('/:id', userCtrl.getOneUser);

router.put('/:id', userCtrl.updateUser);

router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
