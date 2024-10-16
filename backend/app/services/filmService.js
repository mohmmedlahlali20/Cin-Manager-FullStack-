const filmsModel = require('../models/film');
const minioClient = require('../../config/minio');





class classFilm {
    async getAllFilms() {
        const films = await filmsModel
        .find({ isDelete: false })
      
        return films;
    }

    async getFilmById(id) {
        const film = await filmsModel
        .findById(id)
        .populate('director');
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


    



    async uploadMovieToMinio(file) {
        const bucketName = 'movies';
        const objectName = `${Date.now()}_${file.originalname}`;
        const videoBuffer = file.buffer;

        try {
            const bucketExists = await minioClient.bucketExists(bucketName);
            if (!bucketExists) {
                await minioClient.makeBucket(bucketName, 'us-east-1');
            }

            await minioClient.putObject(
                bucketName, 
                objectName, 
                videoBuffer, 
                file.size, 
                { 'Content-Type': 'video/mp4' } 
            );

            return `http://127.0.0.1:9000/${bucketName}/${objectName}`;
        } catch (err) {
            throw new Error(`Erreur lors de l'upload sur MinIO : ${err.message}`);
        }
    }

    async updateFilmWithVideo(filmId, videoUrl) {
        const updatedFilm = await filmsModel.findByIdAndUpdate(filmId, { movies: videoUrl }, { new: true });
        return updatedFilm;
    }



}



module.exports = new classFilm();