const raitingModel = require('../models/raiting')






class RaitingService {


    async createRaiting(data) {
        const newRaiting = new raitingModel(data);
        await newRaiting.save();
        return newRaiting;
    }


    
    
    
    
    async  getRaitingsByFilmId(filmId) {
        const raitings = await raitingModel.find({ film: filmId });
    
        if (raitings.length === 0) {
            return 0;  
        }
    
   
        const totalRating = raitings.reduce((sum, rating) => sum + rating.note, 0);
    
        const avgRating = totalRating / raitings.length;
        console.log(avgRating);
        
        return avgRating;
    }



}



module.exports = new RaitingService();