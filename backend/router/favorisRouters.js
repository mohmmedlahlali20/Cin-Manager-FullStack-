const express = require('express');

const {
    addFavoris,
    getFavoris
} = 
require('../app/controllers/favorisController')

const router = express.Router()

const authMiddleware = require('../middleware/auth')


router.post('/addFavoris',authMiddleware, addFavoris)

router.get('/getFavoris',authMiddleware, getFavoris)





module.exports = router