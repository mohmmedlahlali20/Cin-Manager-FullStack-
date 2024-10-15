const express = require('express');
const {upload } = require('../config/multer')
const {
    getAllFilms,
    createFilm
} =
    require('../app/controllers/filmController')

const authMiddleware = require('../middleware/auth')
const router = express.Router()


router.get('/getAllFilms', authMiddleware, getAllFilms)

router.post('/createFilms', authMiddleware, upload.single('image'), createFilm);


module.exports = router;