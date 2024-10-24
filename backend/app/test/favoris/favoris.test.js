const favorisController = require('../../controllers/favorisController');
const favorisService = require('../../services/favorisService')

jest.mock('../../services/favorisService')

describe('Test Favoris' ,  () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    let req, res;
    beforeEach(() => {
        req = {
            body: {
                userId: "123",
                filmId: "321"
            },
            params: {
                id: "213"
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    }
)

test('test get favoris', async () => {
    req.user = { id: "123" };

    favorisService.getAllFavoris.mockResolvedValueOnce([
        { userId: "123", filmId: "321" },
        { userId: "456", filmId: "789" }
    ]);

    await favorisController.getFavoris(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
        favoris: [
            { userId: "123", filmId: "321" },
            { userId: "456", filmId: "789" }
        ]
    });
});

test('test add favoris', async () => {
    
    req.user = { id: "123" }; 
    req.params = { filmId: "321" };

    const mockFavori = { userId: "123", filmId: "321" }; 

    favorisService.addFavoris = jest.fn().mockResolvedValue(mockFavori);

    await favorisController.addFavoris(req, res);

    expect(favorisService.addFavoris).toHaveBeenCalledWith({
        userId: "123",
        filmId: "321"
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ favori: mockFavori });
});


})