const express = require('express');
const multer = require('multer');
const { upload } = require('../config/multer');
const { getAllFilms, createFilm, getFilmById, ajouterVedio } = require('../app/controllers/filmController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });

/**
 * @swagger
 * tags:
 *   name: Films
 *   description: API pour la gestion des films
 */

/**
 * @swagger
 * /api/films/getAllFilms:
 *   get:
 *     summary: Obtenir tous les films
 *     description: Cette route permet d'obtenir la liste de tous les films.
 *     tags: [Films]
 *     responses:
 *       200:
 *         description: Liste des films récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/getAllFilms', getAllFilms);

/**
 * @swagger
 * /api/films/getFilms/{id}:
 *   get:
 *     summary: Obtenir un film par ID
 *     description: Cette route permet d'obtenir les détails d'un film en fonction de son ID. Nécessite une authentification.
 *     tags: [Films]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du film à récupérer
 *     responses:
 *       200:
 *         description: Détails du film récupérés avec succès
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé, nécessite une authentification
 */
router.get('/getFilms/:id', authMiddleware, getFilmById);

/**
 * @swagger
 * /api/films/createFilms:
 *   post:
 *     summary: Créer un film
 *     description: Cette route permet de créer un nouveau film. Nécessite une authentification et permet l'upload d'une image.
 *     tags: [Films]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titre du film
 *               description:
 *                 type: string
 *                 description: Description du film
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image du film à uploader
 *     responses:
 *       201:
 *         description: Film créé avec succès
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé, nécessite une authentification
 */
router.post('/createFilms', authMiddleware, upload.single('image'), createFilm);

/**
 * @swagger
 * /api/films/video/{filmId}:
 *   put:
 *     summary: Ajouter une vidéo à un film
 *     description: Cette route permet d'ajouter une vidéo à un film existant. Nécessite une authentification.
 *     tags: [Films]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: filmId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du film auquel ajouter la vidéo
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               movies:
 *                 type: string
 *                 format: binary
 *                 description: Vidéo du film à uploader
 *     responses:
 *       200:
 *         description: Vidéo ajoutée avec succès
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé, nécessite une authentification
 */
router.put('/video/:filmId', uploads.single('movies'), ajouterVedio);

module.exports = router;
