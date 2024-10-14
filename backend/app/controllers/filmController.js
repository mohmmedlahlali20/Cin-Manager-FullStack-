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
        res.status(500).json({ message: 'Failed to create film' });
    }
};