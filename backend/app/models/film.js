const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: [String], 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;
