const salleController = require('../../controllers/salleController');
const salleService = require('../../services/salleService');

jest.mock('../../services/salleService');

describe('SalleController', () => {
    

    describe('getAllSalles', () => {
        it('should return all salles', async () => {
            const sallesMock = [
                { name: 'Salle 1', capacite: 100 },
                { name: 'Salle 2', capacite: 50 },
            ];
            salleService.getAllSalles.mockResolvedValue(sallesMock);

            const result = await salleController.getAllSalles();
            
            expect(result).toEqual(sallesMock); 
            expect(salleService.getAllSalles).toHaveBeenCalledTimes(1); 
        });
    });

    describe('createSalle', () => {
        it('should create a new salle', async () => {
            const req = { body: { name: 'Salle 1', capacite: 100 } };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            const newSalle = { _id: '1', name: 'Salle 1', capacite: 100 };

            salleService.createSalle.mockResolvedValue(newSalle); 
            await salleController.createSalle(req, res);

            expect(salleService.createSalle).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201); 
            expect(res.json).toHaveBeenCalledWith(newSalle);
        });
    });


});
