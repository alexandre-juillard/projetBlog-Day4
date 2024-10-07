const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const Like = require('../models/Like');
const likeCtrl = require('../controllers/like');

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Gestion des likes
 */
/**
 * @swagger
 * /likes:
 *   post:
 *     summary: Liker un post
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post
 *             properties:
 *               post:
 *                 type: string
 *                 description: L'ID du post aimé
 *     responses:
 *       201:
 *         description: Post aimé avec succès
 *       400:
 *         description: Erreur lors de l'enregistrement du like
 */

router.post('/', auth, likeCtrl.likePost);

/**
 * @swagger
 * /likes/{id}:
 *   delete:
 *     summary: Unliker un post
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du like à retirer
 *     responses:
 *       200:
 *         description: Post n'est plus aimé
 *       400:
 *         description: Erreur lors de la suppression du like
 */

router.delete('/:id', auth, likeCtrl.unlikePost);

/**
 * @swagger
 * /likes:
 *   get:
 *     summary: Récupérer tous les likes
 *     tags: [Likes]
 *     responses:
 *       200:
 *         description: Liste de tous les likes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user:
 *                     type: string
 *                     description: L'ID de l'utilisateur qui a aimé le post
 *                   post:
 *                     type: string
 *                     description: L'ID du post aimé
 *       400:
 *         description: Erreur lors de la récupération des likes
 */

router.get('/', auth, likeCtrl.getAllLikes);

module.exports = router;