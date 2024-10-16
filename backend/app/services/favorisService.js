const favorisModel = require('../models/favoris');




class FavorisService {
    async getAllFavoris() {
        const favoris = await favorisModel.find({ isDelete: false });
        return favoris;
    }

    async getFavorisByUserId(userId) {
        const userFavoris = await favorisModel.find({
            userId: userId, 
        })  
    
        console.log("favoris found:", userFavoris);
        return userFavoris;
    }
    


    async addFavoris(favoriData) {
        const newFavoris = new favorisModel(favoriData); 
        await newFavoris.save();
        return newFavoris;
    }
    
}

module.exports = new FavorisService();