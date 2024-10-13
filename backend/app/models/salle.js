const mongoss = require('mongoose')



const salleSchema = new mongoss.Schema({
    name: {
        type: String,
        required: true
    },
    capacite: {
        type: Number,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    createAt : {
        type: Date,
        default: Date.now()
    },

}, {timestamps: true})



const Salle = mongoss.model('Salle', salleSchema)


module.exports = Salle;