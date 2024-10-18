const CommentaireService = require('../services/commentairService');

exports.addCommentaire = async (req, res) => {
    try {
        const { userId, filmId, commentair } = req.body;
        
        if (!userId || !filmId || !commentair) {
            return res.status(400).json({ message: 'userId, filmId, commentaire are required.' });
        }

        const commentaireData = {
            userId,
            filmId,
            commentair,
        };

        const comment = await CommentaireService.Addcomments(commentaireData);
        res.status(201).json({ comment });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add commentaire' });
    }
};

exports.getCommentsByFilmId = async (req, res) => {
    const { filmId } = req.params;
    try {
        const comments = await CommentaireService.GetcommentsByFilmId(filmId);
        res.status(200).json({ comments });
    } catch (err) {
        res.status(500).json({ msg: 'Error getting comments' });
        console.error('Error:', err);
    }
};


