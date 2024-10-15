const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: ['Action', 'Drama', 'Thriller', 'Comedy', 'Fantasy'],

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
    image: {
        type: String,
        required: true,
    },
    movies: {
        type:String,
        required: false
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },

    createAt: {
        type: Date,
        default: Date.now
    }
});

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;
