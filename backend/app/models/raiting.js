const mongoss = require('mongoose');

const raitingShema = new mongoss.Schema({
    filmId: {
        type: mongoss.Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    },
    userId: {
        type: mongoss.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    note: {
        type: Number,
        min: 0,
        max: 10,
        required: true
    }
})

module.exports = mongoss.model('Raiting', raitingShema);