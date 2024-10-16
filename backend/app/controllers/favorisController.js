const favorisService = require('../services/favorisService');

exports.addFavoris = async (req, res) => {
    try {
        const favori = await favorisService.addFavoris(req.body);
        res.status(201).json({ favori });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add favori' });
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