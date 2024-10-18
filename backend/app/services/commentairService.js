const commentairModel = require('../models/comments'); // Ensure the path is correct

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

        console.log("service", comments);
        return comments;
    }
}

module.exports = new CommentaireService();
