const favorisService = require('../services/favorisService');

exports.addFavoris = async (req, res) => {
    try {
        const { filmId } = req.params; 
        const userId = req.user.id; 
        if (!filmId || !userId) {
            return res.status(400).json({ message: 'filmId and userId are required.' });
        }

        const favoriData = {
            filmId: filmId,
            userId: userId  
        };

      
        const favori = await favorisService.addFavoris(favoriData);
        
        res.status(201).json({ favori });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add favori' });
    }
};

exports.getFavorisByUserId = async (req, res) => {
    try {
       

        const userFavoris = await favorisService.getFavorisByUserId(req.user.id);
        console.log(userFavoris);
        res.status(200).json({ userFavoris });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get favoris' });
    }
};





exports.getFavoris = async (req, res) => {
    try {
        const favoris = await favorisService.getAllFavoris(req.user.id);
        res.status(200).json({ favoris });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get favoris' });
    }
};