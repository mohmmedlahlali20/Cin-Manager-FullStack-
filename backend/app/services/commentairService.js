const commentairModel = require('../models/comments'); 

class CommentaireService {
    async Addcomments(data) {
        const commentaire = new commentairModel(data);
        await commentaire.save();
        return commentaire;
    }

    async GetcommentsByFilmId(filmId) {
        const comments = await commentairModel
        .find({ filmId })
        .populate('userId') 
        return comments;
    }
}

module.exports = new CommentaireService();
