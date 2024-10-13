const express = require('express');
const {
    getAllSalles ,
    createSalle,
    updateSalle,
    deleteSalle,
    getSalleById,
    getSteatsBySalleId

} = require('../app/controllers/salleController')

const authMiddleware = require('../middleware/auth')


const router = express.Router()

router.get('/getAllSalle',authMiddleware, getAllSalles)
router.get('/getSalleById/:id' ,authMiddleware, getSalleById)
router.get('/salleID/:id/steats',authMiddleware, getSteatsBySalleId)

router.post('/createSalle', authMiddleware,createSalle)

router.put('/updateSalle/:id', authMiddleware,updateSalle)

router.delete('/deleteSalle/:id', authMiddleware,deleteSalle)


module.exports = router