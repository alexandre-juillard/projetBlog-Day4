const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Gestion des commentaires
 */
/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Créer un nouveau commentaire
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - author
 *               - post_id
 *             properties:
 *               content:
 *                 type: string
 *                 description: Le texte du commentaire
 *               author:
 *                 type: string
 *                 description: L'auteur du commentaire
 *               post_id:
 *                 type: string
 *                 description: L'ID du post associé au commentaire
 *     responses:
 *       201:
 *         description: Commentaire créé avec succès
 *       400:
 *         description: Erreur lors de la création du commentaire
 */

router.post('/posts/:id/comments', auth, commentCtrl.createComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Mettre à jour un commentaire
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du commentaire à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Le nouveau texte du commentaire
 *               author:
 *                 type: string
 *                 description: L'auteur du commentaire
 *     responses:
 *       200:
 *         description: Commentaire mis à jour avec succès
 *       400:
 *         description: Erreur lors de la mise à jour du commentaire
 */

router.put('/:id', auth, commentCtrl.updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Supprimer un commentaire
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du commentaire à supprimer
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès
 *       400:
 *         description: Erreur lors de la suppression du commentaire
 */

router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;