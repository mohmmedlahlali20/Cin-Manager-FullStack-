const express = require('express');
const {
    addCommentaire,
    getCommentsByFilmId
} = require('../app/controllers/CommentaireController');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/admin');

const router = express.Router();

/**
 * @swagger
 * /api/comments/addComment:
 *   post:
 *     summary: Ajouter un commentaire
 *     description: Cette route permet d'ajouter un commentaire à un film. Nécessite une authentification.
 *     tags: [Commentaires]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - filmId
 *               - userId
 *               - content
 *             properties:
 *               filmId:
 *                 type: string
 *                 description: ID du film auquel le commentaire est associé
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur qui fait le commentaire
 *               content:
 *                 type: string
 *                 description: Contenu du commentaire
 *     responses:
 *       200:
 *         description: Commentaire ajouté avec succès
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé, nécessite une authentification
 */
router.post('/addComment', authMiddleware, addCommentaire);

/**
 * @swagger
 * /api/comments/getComments/{filmId}:
 *   get:
 *     summary: Obtenir les commentaires d'un film
 *     description: Cette route permet de récupérer les commentaires d'un film en fonction de son ID. Nécessite une authentification.
 *     tags: [Commentaires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: filmId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du film dont les commentaires doivent être récupérés
 *     responses:
 *       200:
 *         description: Liste des commentaires récupérée avec succès
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé, nécessite une authentification
 */
router.get('/getComments/:filmId', authMiddleware, getCommentsByFilmId);

module.exports = router;
