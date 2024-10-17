const express = require('express');


const {
    getAllSeances,
    createSeance ,
    getSeanceByFilmId,
    getSeanceById,
    updateSeance,
    deleteSeance
} =
require('../app/controllers/seanceController')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/admin')

const router = express.Router()



router.get('/get-seance' ,authMiddleware, getAllSeances)
router.post('/addSeance' ,  createSeance)
router.get('/getseance/:id' , authMiddleware,getSeanceByFilmId)




module.exports = router