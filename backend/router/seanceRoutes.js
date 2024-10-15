const express = require('express');


const {
    getAllSeances,
    createSeance ,
    getSeanceById,
    updateSeance,
    deleteSeance
} =
require('../app/controllers/seanceController')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/admin')

const router = express.Router()



router.get('/get-seance' ,authMiddleware, getAllSeances)
router.post('/addSeance' , authMiddleware , createSeance)




module.exports = router