const express = require('express');


const {
    addCommentaire,
    getCommentsByFilmId
} =
require('../app/controllers/CommentaireController')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/admin')

const router = express.Router()


router.post('/addComment', authMiddleware, addCommentaire)
router.get('/getComments/:filmId' , authMiddleware , getCommentsByFilmId)









module.exports = router