const favorisModel = require('../models/favoris');




class FavorisService {
    async getAllFavoris() {
        const favoris = await favorisModel.find({ isDelete: false });
        return favoris;
    }
    async addFavoris() {
        const newFavoris = new favorisModel();
        await newFavoris.save();
        return newFavoris;
    }
}

module.exports = new FavorisService();