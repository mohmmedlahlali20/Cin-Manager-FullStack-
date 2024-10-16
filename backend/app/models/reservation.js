const mongoss = require('mongoose')



const reservationSchela = new mongoss.Schema({
    userId: {
        type: mongoss.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // salleId: {
    //     type: mongoss.Schema.Types.ObjectId,
    //     ref: 'Salle',
    //     required: true
    // },
    seanceId: {
        type: mongoss.Schema.Types.ObjectId,
        ref: 'Seance',
        required: true
    },
    isDelete :{
        type: Boolean,
        default: false,
        
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

module.exports  = mongoss.model('Reservation', reservationSchela)