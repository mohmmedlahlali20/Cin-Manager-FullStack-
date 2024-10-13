const salle = require('../models/salle')






class salleService {
    async getAllSalles() {
        const salles = await salle.find({ isDelete: false });
        return salles;
    }

    async getOneSalle(id) {
        const salle = await salle.findById(id);
        if (!salle) throw new Error('Salle not found');
        return salle;
    }


    async createSalle(data) {
        const createNewSalle = new salle(data);
        await createNewSalle.save();
        console.log(createNewSalle.save());
        
        return createNewSalle;
    }


    async updateSalle(id, data) {
        const salle = await salle.findByIdAndUpdate(id, data, { new: true });
        if (!salle) throw new Error('Salle not found');
        return salle;
    }


    async deleteSalle(id) {
        const salle = await salle.findByIdAndUpdate(id, { isDelete: true }, { new: true });
        if (!salle) throw new Error('Salle not found');
        return salle;
    }


}




module.exports = new salleService();