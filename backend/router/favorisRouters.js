const express = require('express');

const {
    addFavoris,
    getFavoris,
    getFavorisByUserId
} = 
require('../app/controllers/favorisController')

const router = express.Router()

const authMiddleware = require('../middleware/auth')


router.post('/addFavoris/:filmId', authMiddleware, addFavoris);

router.get('/getUserFavori/:userId', authMiddleware, getFavorisByUserId);

router.get('/getFavoris',authMiddleware, getFavoris)





module.exports = router