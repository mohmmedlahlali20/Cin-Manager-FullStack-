const salleService = require('../services/salleService')


exports.getAllSalles = async () => {
    try {
        const salles = await salleService.getAllSalles();
        return salles;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get salles');
    }

}


exports.getOneSalle = async (req , res) => {
    try {
        const salle = await salleService.getOneSalle(req.params.id);
        return salle;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get salle');
    }
}



exports.createSalle = async (req , res) => {
    try {
        const createNewSalle = await salleService.createSalle(req.body);
        res.status(201).json(createNewSalle); 
    } catch (error) {
        console.error('Error creating salle:', error);
        res.status(500).json({ message: 'Failed to create salle' });
    }
}



exports.updateSalle = async (req , res) => {
    try {
        const updatedSalle = await salleService.updateSalle(req.params.id, req.body);
        return updatedSalle;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to update salle');
    }
}



exports.deleteSalle = async (req , res) => {
    try {
        const deletedSalle = await salleService.deleteSalle(req.params.id);
        return deletedSalle;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to delete salle');
    }
}