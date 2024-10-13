const authController = require('../../controllers/authController');
const authService = require('../../services/authService');

jest.mock('../../services/authService');

describe('AuthController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: 'cinematest@gmail.com',
                password: 'cinematest123'
            },
            user: {
                id: 1,
                email: 'cinematest@gmail.com',
                verified: true
            },
            params: {
                token: 'testToken'
            },
            cookies: {
                set: jest.fn()
            },
            send: jest.fn()
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('register a new user', async () => {
        const mockUser = {
            id: 1,
            email: 'cinematest@gmail.com',
            verified: false
        };

        authService.register.mockResolvedValue(mockUser);
        authService.sendVerificationEmail.mockResolvedValue(true);

        await authController.register(req, res);

        expect(res.status).toHaveBeenCalledWith(201);

        expect(authService.sendVerificationEmail).toHaveBeenCalledWith(mockUser);

        expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully. Please verify your email.' });
    });



    test('login user', async () => {
        const mockUser = {
            id: 1,
            email: 'cinematest@gmail.com',
            verified: true
        };
    
        authService.login.mockResolvedValue({ user: mockUser, token: 'testToken' });
    
        await authController.login(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            user: {
                token: 'testToken',
                user: mockUser
            }
        });
    });


    test('verify user email', async () => {
        authService.verifyEmail.mockResolvedValue(true);
        })


    
    
});
