const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
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

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Récupérer tous les commentaires
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de tous les commentaires
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: L'ID du commentaire
 *                   content_text:
 *                     type: string
 *                     description: Le contenu du commentaire
 *                   author:
 *                     type: string
 *                     description: L'auteur du commentaire
 *                   post_id:
 *                     type: string
 *                     description: L'ID du post auquel le commentaire est associé
 *       400:
 *         description: Erreur lors de la récupération des commentaires
 */
router.get('/', auth, commentCtrl.getComments);

module.exports = router;