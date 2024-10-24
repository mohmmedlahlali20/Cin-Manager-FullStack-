const raitingController = require('../../controllers/raitingController');
const raitingService = require('../../services/raitingService');

jest.mock('../../services/raitingService');

describe('RaitingController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    let req, res;

    beforeEach(() => {
        req = {
            body: {
                userId: '123',
                filmId: '321',
                note: 5
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

    test('Add raiting successfully', async () => {
        const mockRaiting = req.body ;
        
        raitingService.createRaiting = jest.fn().mockResolvedValue(mockRaiting);
    
        await raitingController.addRaiting(req, res);
    
        expect(raitingService.createRaiting).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ raiting: mockRaiting });
    });
    

    test('Get raitings by filmId successfully', async () => {
        const mockRaitings = [{ filmId: '321', userId: '123', note: 5 }];
        raitingService.getRaitingsByFilmId.mockResolvedValue(mockRaitings);

        await raitingController.getRaitingsByFilmId(req, res);

        expect(raitingService.getRaitingsByFilmId).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ raitings: mockRaitings });
    });

    
});
