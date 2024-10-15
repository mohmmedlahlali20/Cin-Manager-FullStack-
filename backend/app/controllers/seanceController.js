const seanceService = require('../services/seanceService');

exports.getAllSeances = async (req, res) => {
    try {
        const seances = await seanceService.getAllSeances();
        res.status(200).json({ seances });
        return seances;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get seances' });
    }
 
}

exports.createSeance = async (req, res) => {
    try {
        const seance = await seanceService.createSeance(req.body);
        res.status(201).json(seance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create seance' });
    }
}


exports.getSeanceById = async (req, res) => {
    try {
        const seance = await seanceService.getSeanceById(req.params.id);
        res.status(200).json({ seance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get seance by id' });
    }
}


exports.updateSeance = async (req, res) => {
    try {
        const seance = await seanceService.updateSeance(req.params.id, req.body);
        res.status(200).json(seance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update seance' });
    }

}

exports.deleteSeance = async (req, res) => {
    try {
        const seance = await seanceService.deleteSeance(req.params.id);
        res.status(200).json(seance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete seance' });
    }
 
}


