const mongoose = require('mongoose');
const { ObjectId } = mongoose;
const seanceController = require('../../controllers/seanceController');
const seanceService = require('../../services/seanceService');

jest.mock('../../services/seanceService');

describe('SeanceController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    let req, res;

    beforeEach(() => {
        req = {
            body: {
                start_date: '2022-01-01T10:00:00.000Z',
                end_date: '2022-01-01T12:00:00.000Z',
                salleId: new ObjectId(), 
                filmId: new ObjectId(), 
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('test create a new seance', async () => {
        const seanceMock = {
            _id: new ObjectId(),
            start_date: '2022-01-01T10:00:00.000Z',
            end_date: '2022-01-01T12:00:00.000Z',
            salleId: req.body.salleId,
            filmId: req.body.filmId,
        };

        seanceService.createSeance.mockResolvedValue(seanceMock);
        await seanceController.createSeance(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(seanceMock);
    });
});
