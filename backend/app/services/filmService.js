const filmsModel = require('../models/film');






class classFilm {
    async getAllFilms() {
        const films = await filmsModel.find({ isDelete: false });
        return films;
    }
    async getFilmById(id) {
        const film = await filmsModel.findById(id);
        if (!film) throw new Error('Film not found');
        return film;
    }

    async createFilm(data, file) {
        if (!data.title || !data.genre || !data.description || !data.publishedDate || !file) {
            throw new Error('Missing required fields');
        }
    
        const filmData = {
            ...data,
            image: `uploads/${file.filename}`
        };
        
        console.log('filmData before save:', filmData);
        
    
        const createNewFilm = new filmsModel(filmData);
        await createNewFilm.save();
    
        return createNewFilm;
    }
    

    async updateFilm(id, data) {
        const updatedFilm = await filmsModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedFilm) throw new Error('Film not found');
        return updatedFilm;
    }
    async deleteFilm(id) {
        const deletedFilm = await filmsModel.findByIdAndUpdate(id, { isDelete: true }, { new: true });
        if (!deletedFilm) throw new Error('Film not found');
        return deletedFilm;
    }

    async getFilmsByGenre(genre) {
        const films = await filmsModel.find({ isDelete: false, genre });
        return films;
    }



}



module.exports = new classFilm();