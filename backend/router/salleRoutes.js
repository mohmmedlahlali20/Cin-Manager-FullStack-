const express = require('express');
const {
    getAllSalles ,
    createSalle,
    updateSalle,
    deleteSalle,
    getOneSalle

} = require('../app/controllers/salleController')

const authMiddleware = require('../middleware/auth')


const router = express.Router()

router.get('/getAllSalle',authMiddleware, getAllSalles)
router.get('/getOneSalle/:id' ,authMiddleware, getOneSalle)

router.post('/createSalle', authMiddleware,createSalle)

router.put('/updateSalle/:id', authMiddleware,updateSalle)

router.delete('/deleteSalle/:id', authMiddleware,deleteSalle)


module.exports = router