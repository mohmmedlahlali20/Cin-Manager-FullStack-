const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    capacite: {
        type: Number,
        required: true
    },
    seats: [{
        number: {
            type: Number,
            required: true
        },
        available: {
            type: Boolean,
            default: true
        }
    }],
    isDelete: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

salleSchema.pre('save', function (next) {
    if (this.isNew) {
        this.seats = Array.from({ length: this.capacite }, (_, index) => ({
            number: index + 1,
            available: true
        }));
    }
    next();
});

salleSchema.pre(/^find/, function (next) {
    this.where({ isDelete: false });
    next();
});

const Salle = mongoose.model('Salle', salleSchema);

module.exports = Salle;
