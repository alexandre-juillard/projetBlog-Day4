var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/user');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Enregistrement d'un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: L'utilisateur existe déjà
 */
router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

router.get('/:id', userCtrl.getOneUser);

router.put('/:id', userCtrl.updateUser);

router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
