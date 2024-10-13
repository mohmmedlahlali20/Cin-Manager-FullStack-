const salleController = require('../../controllers/salleController');
const salleService = require('../../services/salleService');

jest.mock('../../services/salleService');

describe('SalleController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    let req, res;

    beforeEach(() => {
        req = {
            body: {
                name: 'Salle Test',
                capacite: 100
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

   
       test('get all salles', async () => {
            const sallesMock = [
                { name: 'Salle 1', capacite: 100 },
                { name: 'Salle 2', capacite: 50 },
            ];
            salleService.getAllSalles.mockResolvedValue(sallesMock);
    
            await salleController.getAllSalles(req, res);
    
            expect(res.status).toHaveBeenCalledWith(200); 
    
            expect(res.json).toHaveBeenCalledWith({ salles: sallesMock });
        });
   
        test('test Create new salle', async () => {
            const newSalle = { _id: '123', name: req.body.name, capacite: req.body.capacite };
    
            salleService.createSalle.mockResolvedValue(newSalle);
    
            await salleController.createSalle(req, res); 
    
            expect(res.status).toHaveBeenCalledWith(201);
    
            expect(res.json).toHaveBeenCalledWith(newSalle);
        });


        test('update salle' , async () => {
            const updatedSalle = { _id: req.params.id,...req.body };
            
            salleService.updateSalle.mockResolvedValue(updatedSalle);
            
            await salleController.updateSalle(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            
            expect(res.json).toHaveBeenCalledWith(updatedSalle);
        })

        test('find salle by ID', async () => {
            const salleMock = { _id: req.params.id, ...req.body };
            
            salleService.getSalleById.mockResolvedValue(salleMock);
            
            await salleController.getSalleById(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            
            expect(res.json).toHaveBeenCalledWith({ salle: salleMock });
        });


        test('test update salle' , async () => {
            const updatedSalle = { _id: req.params.id,...req.body };
            
            salleService.updateSalle.mockResolvedValue(updatedSalle);
            
            await salleController.updateSalle(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            
            expect(res.json).toHaveBeenCalledWith(updatedSalle);
        })


        test('test delete salle', async () => {
            const deletedSalle = { message: 'Salle deleted successfully' };
            salleService.deleteSalle.mockResolvedValue(deletedSalle);
            await salleController.deleteSalle(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(deletedSalle);
        });



        // test('test steas by salle id' , async () => {
        //     const steasMock = [
        //         { name: 'Steak 1', prix: 15 },
        //         { name: 'Steak 2', prix: 10 },
        //     ];
        //     salleService.getSteasBySalleId.mockResolvedValue(steasMock);
            
        //     await salleController.getSteasBySalleId(req, res);
            
        //     expect(res.status).toHaveBeenCalledWith(200);
            
        //     expect(res.json).toHaveBeenCalledWith({ steas: steasMock });
        // })
        

 
    

});
