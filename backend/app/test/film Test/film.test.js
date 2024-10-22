const filmController = require('../../controllers/filmController');
const filmService = require('../../services/filmService');

jest.mock('../../services/filmService');



describe('FilmController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    let req, res;
    beforeEach(() => {
        req = {
            body: {
                title: 'Film Test',
                description: 'Description Test',
                publishedDate : '1998/08/10',
                image: 'image.jpg',
                director : '123',
                genre: ['Genre Test 1', 'Genre Test 2']
            },
            params: {
                id: '123'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('test get all films', async () => {
        const filmsMock = [
            { title: 'Film 1', description: 'Description 1', publishedDate: '1998/08/10', image: 'image1.jpg', director: '123', genre: ['Genre 1', 'Genre 2'] },
            { title: 'Film 2', description: 'Description 2', publishedDate: '1999/08/10', image: 'image2.jpg', director: '456', genre: ['Genre 3', 'Genre 4'] },
        ];
    
        filmService.getAllFilms.mockResolvedValue(filmsMock);
        await filmController.getAllFilms(req, res);
        expect(filmService.getAllFilms).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ films: filmsMock });
    });

    test('test create Films' , async() => {
        const newFilm = { title: 'Film Test', description: 'Description Test', publishedDate : '1998/08/10', image: 'image.jpg', director : '123', genre: ['Genre Test 1', 'Genre Test 2'] };
        filmService.createFilm.mockResolvedValue(newFilm);
        await filmController.createFilm(req, res);
        expect(filmService.createFilm).toHaveBeenCalledWith(req.body, req.file);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newFilm);

    })

    test('test update film' , async () => {
        const updatedFilm = { _id: req.params.id,...req.body };
        filmService.updateFilm.mockResolvedValue(updatedFilm);
        await filmController.updateFilm(req, res);
        expect(filmService.updateFilm).toHaveBeenCalledWith(req.params.id, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedFilm);
    })

    test('test delete films' , async () => {
        const deletedFilm = { _id: req.params.id,...req.body };
        filmService.deleteFilm.mockResolvedValue(deletedFilm);
        await filmController.deleteFilm(req, res);
        expect(filmService.deleteFilm).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(deletedFilm);
    })

    test('test get film by id' , async () => {
        const filmMock = { title: 'Film Test', description: 'Description Test', publishedDate : '1998/08/10', image: 'image.jpg', director : '123', genre: ['Genre Test 1', 'Genre Test 2'] };
        filmService.getFilmById.mockResolvedValue(filmMock);
        await filmController.getFilmById(req, res);
        expect(filmService.getFilmById).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(filmMock);
    })

    test('test get films by genre' , async () => {
        const filmsMock = [
            { title: 'Film 1', description: 'Description 1', publishedDate: '1998/08/10', image: 'image1.jpg', director: '123', genre: ['Genre Test 1', 'Genre Test 2'] },
            { title: 'Film 2', description: 'Description 2', publishedDate: '1999/08/10', image: 'image2.jpg', director: '456', genre: ['Genre Test 1', 'Genre Test 2'] },
        ];
        filmService.getFilmsByGenre.mockResolvedValue(filmsMock);
        await filmController.getFilmsByGenre(req, res);
        expect(filmService.getFilmsByGenre).toHaveBeenCalledWith(req.params.genre);
        expect(res.status).toHaveBeenCalledWith(200);

    })


    // test('test ajout du video' , async () => {
    //     const newVideo = { movies : 'https://vedio/link/' };
    //     filmService.addVideo.mockResolvedValue(newVideo);
    //     await filmController.ajouterVedio(req, res);
    //     expect(filmService.addVideo).toHaveBeenCalledWith(req.params.id, req.body);
    //     expect(res.status).toHaveBeenCalledWith(201);
    //     expect(res.json).toHaveBeenCalledWith(newVideo);
    // })


    



});
