const seanceModel = require('../models/seance');


class SeanceService {
    async getAllSeances() {
        const seances = await seanceModel.find({ isDelete: false });
        return seances;
    }
    async getSeanceById(id) {
        const seance = await seanceModel.findById(id);
        if (!seance) throw new Error('Service not found');
        return seance;
    }
    async createSeance(data) {
        console.log(data);
        
        const newSeance = new seanceModel(data);
        await newSeance.save();
        return newSeance;
    }
    async updateSeance(id, data) {
        const updatedSeance = await seanceModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedSeance) throw new Error('Service not found');
        return updatedSeance;
    }
    async deleteSeance(id) {
        const deletedSeance = await seanceModel.findByIdAndUpdate(id, { isDelete: true }, { new: true });
        if (!deletedSeance) throw new Error('Service not found');
        return deletedSeance;
    }


    async getSeanceByFilmId(filmId) {
        try {
            const seances = await seanceModel
                .find({ filmId })
                .populate({
                    path: 'salleId',
                    model: 'Salle',
                });
            return seances;
        } catch (error) {
            console.error('Error fetching seances:', error);
            throw error; 
        }
    }
    
}
module.exports = new SeanceService();