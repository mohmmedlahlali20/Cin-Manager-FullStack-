const filmService = require('../services/filmService')



exports.getAllFilms = async (req, res) => {
    try {
        const films = await filmService.getAllFilms();
        res.status(200).json({ films });
        return films;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get films' });
    }
}


exports.createFilm = async (req, res) => {
    try {
        const newFilm = await filmService.createFilm(req.body, req.file);
        res.status(201).json(newFilm);
    } catch (error) {
        console.error('Error creating film:', error); 
        res.status(500).json({ message: 'Failed to create film', error: error.message });
    }
};

exports.ajouterVedio = async (req, res) => {
    try {
        const { filmId } = req.params;
        console.log(filmId);
        
        const videoUrl = await filmService.uploadMovieToMinio(req.file);
        const updatedFilm = await filmService.updateFilmWithVideo(filmId, videoUrl);

        res.status(200).json({ message: 'Vidéo ajoutée au film avec succès', film: updatedFilm });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


exports.getFilmById = async (req, res) => {
    try {
        const film = await filmService
        .getFilmById(req.params.id)
      
        ;
        if (!film) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.status(200).json(film);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get film' });
    }
}

exports.updateFilm = async (req, res) => {
    try {
        const updatedFilm = await filmService.updateFilm(req.params.id, req.body);
        if (!updatedFilm) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.status(200).json(updatedFilm);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update film' });
    }
}

exports.deleteFilm = async (req, res) => {
    try {
        const deletedFilm = await filmService.deleteFilm(req.params.id);
        if (!deletedFilm) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.status(200).json(deletedFilm);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete film' });
    }
}

exports.getFilmsByGenre = async (req, res) => {
    try {
        const films = await filmService.getFilmsByGenre(req.params.genre);
        res.status(200).json({ films });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get films by genre' });
    }
}