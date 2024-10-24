const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seanceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seance',
        required: true
    },
    reservedSeats: {
        type:Number, 
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
