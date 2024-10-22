
const reservationController = require('../../controllers/reservtionController.js');
const reservationService = require('../../services/reservationService.js');

jest.mock('../../services/reservationService.js'); 

describe('ReservationController', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                seanceId: '123',
                userId: '321',
            },
            params: {
                id: '123'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks(); 
    });

    describe('addReservation', () => {
        test('should create a reservation successfully', async () => {
            const mockReservation = { userId: '321', seanceId: '123' };
            reservationService.createReservation.mockResolvedValue(mockReservation);

            await reservationController.addReservation(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ reservation: mockReservation });
            expect(reservationService.createReservation).toHaveBeenCalledWith({
                userId: '321',
                seanceId: '123'
            });
        });

        test('return 400 if userId or seanceId is missing', async () => {
            req.body = {};

            await reservationController.addReservation(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: ' userId, seanceId are required.' });
            expect(reservationService.createReservation).not.toHaveBeenCalled();
        });

        test('return 500 if service throws an error', async () => {
            reservationService.createReservation.mockRejectedValue(new Error('Service Error'));

            await reservationController.addReservation(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Failed to add reservation' });
        });
    });

    describe('getReservation', () => {
        test('get all reservations successfully', async () => {
            const mockReservations = [{ id: '1', seanceId: '123', userId: '321' }];
            reservationService.getAllReservations.mockResolvedValue(mockReservations);

            await reservationController.getReservation(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ reservation: mockReservations });
            expect(reservationService.getAllReservations).toHaveBeenCalledWith('123');
        });

        test('return 500 if service throws an error', async () => {
            reservationService.getAllReservations.mockRejectedValue(new Error('Service Error'));

            await reservationController.getReservation(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Failed to get reservation' });
        });
    });
});
