const express = require('express');
const {upload } = require('../config/multer')
const {
    getAllFilms,
    createFilm,
    getFilmById
} =
    require('../app/controllers/filmController')

const authMiddleware = require('../middleware/auth')
const router = express.Router()


router.get('/getAllFilms', authMiddleware, getAllFilms)
router.get('/getFilms/:id' , authMiddleware , getFilmById)
router.post('/createFilms', authMiddleware, upload.single('image'), createFilm);


module.exports = router;