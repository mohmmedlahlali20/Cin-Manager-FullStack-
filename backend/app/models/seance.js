const mongoose = require('mongoose');

const seanceSchema = new mongoose.Schema({
    salleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salle',
        required: true
    },
    filmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Seance', seanceSchema);
