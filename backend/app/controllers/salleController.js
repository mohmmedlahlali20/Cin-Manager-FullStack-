const salleService = require('../services/salleService')


exports.getAllSalles = async (req, res) => {
    try {
        const salles = await salleService.getAllSalles();
        res.status(200).json({ salles }); 
        return salles;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get salles' }); 
    }
};


exports.getSteatsBySalleId = async (req, res) => {
    try {
        const steats = await salleService.getSteatsBySalleId(req.params.id);
        console.log(steats)
        res.status(200).json({ steats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get steats' });
    }
}



exports.getSalleById = async (req , res) => {
    try {
        const salle = await salleService.getSalleById(req.params.id);
        res.status(200).json({ salle });
        return salle;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'cannot find' });
    
    }
}



exports.createSalle = async (req , res) => {
    try {
        const createNewSalle = await salleService.createSalle(req.body);
        res.status(201).json(createNewSalle); 
        return createNewSalle
    } catch (error) {
        console.error('Error creating salle:', error);
        res.status(500).json({ message: 'Failed to create salle' });
    }
}



exports.updateSalle = async (req , res) => {
    try {
        const updatedSalle = await salleService.updateSalle(req.params.id, req.body);
        res.status(200).json(updatedSalle); 
        return updatedSalle;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'cannot Update' });
    }
}



exports.deleteSalle = async (req, res) => {
    try {
        const deletedSalle = await salleService.deleteSalle(req.params.id);
        res.status(200).json(deletedSalle); 
        return deletedSalle;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete salle' });
    }
}