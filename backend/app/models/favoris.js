const mongoss = require('mongoose');




const favorSchema = new mongoss.Schema({
    userId: {
        type: mongoss.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    filmId: {
        type: mongoss.Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

module.exports = mongoss.model('Favor', favorSchema);