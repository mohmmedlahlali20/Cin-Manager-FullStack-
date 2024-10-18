const raitingService = require('../services/raitingService');


exports.addRaiting = async (req, res) => {
    try {
        const { filmId, userId, note } = req.body;
        
        if (!filmId || !userId || !note) {
            return res.status(400).json({ message: 'filmId, userId, and note are required.' });
        }
        const raitingData = {
            filmId,
            userId,
            note,
        };
        const raiting = await raitingService.createRaiting(raitingData);
        res.status(201).json({ raiting });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add raiting' });
    
    }
}

exports.getRaitingsByFilmId = async (req , res) => {
    try {
        const getRaitingsByFilmId = await raitingService.getRaitingsByFilmId(req.params.id)
        res.status(200).json({ raitings: getRaitingsByFilmId });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get raitings by film id' });
    }
 
}