const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const Post = require('../models/Post');
const postCtrl = require('../controllers/post');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gestion des articles
 */
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Créer un nouvel article de blog
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Erreur lors de la création de l'article
 */

router.post('/', auth, postCtrl.createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Récupérer tous les articles de blog
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Liste de tous les articles de blog
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   author:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *       400:
 *         description: Erreur lors de la récupération des articles
 */

router.get('/', auth, postCtrl.getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtenir un article de blog par ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'article de blog
 *     responses:
 *       200:
 *         description: Détails de l'article de blog
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 author:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Article non trouvé
 */

router.get('/:id', auth, postCtrl.getOnePost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Mettre à jour un article de blog
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'article de blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Article mis à jour avec succès
 *       400:
 *         description: Erreur lors de la mise à jour de l'article
 */

router.put('/:id', auth, postCtrl.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Supprimer un article de blog
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'article à supprimer
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 *       400:
 *         description: Erreur lors de la suppression de l'article
 */

router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;