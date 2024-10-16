// routes.js
const express = require('express');
const multer = require('multer');
const { upload } = require('../config/multer');
const { getAllFilms, createFilm, getFilmById, ajouterVedio } = require('../app/controllers/filmController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });

router.get('/getAllFilms', authMiddleware, getAllFilms);
router.get('/getFilms/:id', authMiddleware, getFilmById);
router.post('/createFilms', authMiddleware, upload.single('image'), createFilm);
router.put('/add-video/:filmId', uploads.single('movies'), ajouterVedio);

module.exports = router;
