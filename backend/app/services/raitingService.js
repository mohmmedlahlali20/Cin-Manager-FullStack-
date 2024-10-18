const raitingModel = require('../models/raiting')






class RaitingService {


    async createRaiting(data) {
        const newRaiting = new raitingModel(data);
        await newRaiting.save();
        return newRaiting;
    }


    async getRaitingsByFilmId(filmId) {
        const raitings = await raitingModel.find({ film: filmId });
    
        if (raitings.length === 0) {
            return { raitings, avgRating: 0 };  
        }
    
        const avgRating = raitings.reduce((acc, rating) => acc + (rating.rate || 0), 0) / raitings.length;
        return { raitings, avgRating };
    }
    
    
    



}



module.exports = new RaitingService();