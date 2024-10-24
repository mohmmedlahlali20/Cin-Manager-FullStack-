const express = require('express');
const {
  register,
  login,
  verifyEmail,
  forgetPassword,
  resetPassword,
  Profile,

} = require('../app/controllers/authController.js');

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lastname:
 *                 type: string
 *                 description: lasttname de l'utilisateur
 *               firstname:
 *                 type: string
 *                 description: firstname de l'utilisateur
 *               email:
 *                 type: string
 *                 description: Adresse email
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post('/register', register);  // Route pour l'inscription

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse email
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants incorrects
 */
router.post('/login', login);  // Route pour la connexion

/**
 * @swagger
 * /api/auth/verify-email/{token}:
 *   get:
 *     summary: Vérifier l'email de l'utilisateur
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Jeton de vérification
 *     responses:
 *       200:
 *         description: Email vérifié avec succès
 *       400:
 *         description: Jeton invalide ou expiré
 */
router.get('/verify-email/:token', verifyEmail);  // Route pour vérifier l'email

/**
 * @swagger
 * /api/auth/forget-password:
 *   post:
 *     summary: Demander un email de réinitialisation du mot de passe
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse email de l'utilisateur
 *     responses:
 *       200:
 *         description: Email de réinitialisation envoyé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.post('/forget-password', forgetPassword);  // Route pour demander une réinitialisation de mot de passe

/**
 * @swagger
 * /api/auth/reset-password/{token}:
 *   post:
 *     summary: Réinitialiser le mot de passe
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Jeton de réinitialisation du mot de passe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: Nouveau mot de passe
 *     responses:
 *       200:
 *         description: Mot de passe réinitialisé avec succès
 *       400:
 *         description: Jeton invalide ou expiré
 */
router.post('/reset-password/:token', resetPassword);  // Route pour réinitialiser le mot de passe

/**
 * @swagger
 * /api/auth/me/{userId}:
 *   get:
 *     summary: Récupérer le profil de l'utilisateur
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Profil de l'utilisateur récupéré avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/me/:userId', Profile);  // Route pour récupérer le profil de l'utilisateur




module.exports = router;
