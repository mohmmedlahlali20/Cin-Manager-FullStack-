const express = require('express');
const {
    getAllFilms,
    createFilm
} =
    require('../app/controllers/filmController')

const authMiddleware = require('../middleware/auth')
const {upload } = require('../config/multer')
const router = express.Router()


router.get('/getAllFilms', authMiddleware, getAllFilms)

router.post('/createFilm', authMiddleware,upload.single('image'), createFilm)


module.exports = router;