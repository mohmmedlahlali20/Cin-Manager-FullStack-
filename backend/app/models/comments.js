const mongoss = require('mongoose');

const commentSchema= new mongoss.Schema({
    commentair: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoss.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    filmId: {
        type: mongoss.Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    }
},{
    timestamps: true
})


module.exports = mongoss.model('Comment', commentSchema);