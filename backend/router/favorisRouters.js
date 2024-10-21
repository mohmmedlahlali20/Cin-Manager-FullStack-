const express = require('express');
const {
    addFavoris,
    getFavoris,
    getFavorisByUserId
} = require('../app/controllers/favorisController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favoris
 *   description: API pour la gestion des Favoris
 * 
 * 
 * 
 * @swagger
 * /api/favoris/addFavoris/{filmId}:
 *   post:
 *     summary: Ajouter un film aux favoris
 *     description: Cette route permet d'ajouter un film à la liste des favoris d'un utilisateur. Nécessite une authentification avec un token JWT.
 *     tags: [Favoris]
 *     security:
 *       - bearerAuth: []  # Utilisation du token d'autorisation
 *     parameters:
 *       - in: path
 *         name: filmId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du film à ajouter aux favoris
 *     responses:
 *       200:
 *         description: Film ajouté aux favoris avec succès
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé, nécessite une authentification
 */
router.post('/addFavoris/:filmId', authMiddleware, addFavoris);

/**
 * @swagger
 * /api/favoris/getUserFavori/{userId}:
 *   get:
 *     summary: Obtenir les favoris d'un utilisateur
 *     description: Cette route permet de récupérer la liste des films favoris d'un utilisateur en fonction de son ID. Nécessite une authentification avec un token JWT.
 *     tags: [Favoris]
 *     security:
 *       - bearerAuth: []  # Utilisation du token d'autorisation
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur dont les favoris doivent être récupérés
 *     responses:
 *       200:
 *         description: Liste des favoris récupérée avec succès
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé, nécessite une authentification
 */
router.get('/getUserFavori/:userId', authMiddleware, getFavorisByUserId);

/**
 * @swagger
 * /api/favoris/getFavoris:
 *   get:
 *     summary: Obtenir tous les favoris
 *     description: Cette route permet de récupérer la liste complète des films favoris de tous les utilisateurs. Nécessite une authentification avec un token JWT.
 *     tags: [Favoris]
 *     security:
 *       - bearerAuth: []  # Utilisation du token d'autorisation
 *     responses:
 *       200:
 *         description: Liste des favoris récupérée avec succès
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé, nécessite une authentification
 */
router.get('/getFavoris', authMiddleware, getFavoris);

module.exports = router;
