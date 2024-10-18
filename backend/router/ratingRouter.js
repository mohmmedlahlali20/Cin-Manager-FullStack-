const express = require('express');


const {
    getRaitingsByFilmId,
    addRaiting
} =
require('../app/controllers/raitingController')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/admin')

const router = express.Router()


router.get('/getRaiting/:filmId', authMiddleware, getRaitingsByFilmId)

router.post('/addRaiting', authMiddleware, addRaiting)







module.exports = router