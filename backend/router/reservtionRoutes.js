const express = require('express');


const {
    addReservation,
    getReservation
} =
require('../app/controllers/reservtionController')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/admin')

const router = express.Router()



router.post('/reserve' , authMiddleware , addReservation)

router.get('/getReservations/:id' , authMiddleware , getReservation)





module.exports = router