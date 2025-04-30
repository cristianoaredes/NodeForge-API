const { signup, login } = require('../../../../../src/features/auth/controllers/authController');
const authService = require('../../../../../src/features/auth/services/authService');

// Mock dependencies
jest.mock('../../../../../src/features/auth/services/authService');

describe('Auth Controller', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('signup', () => {
    test('should return 201 and user data on successful signup', async () => {
      // Setup
      const req = { body: { email: 'test@example.com', password: 'password123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();
      const mockUser = { email: req.body.email };
      
      authService.signupService.mockResolvedValue(mockUser);

      // Execute
      await signup(req, res, next);

      // Verify
      expect(authService.signupService).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
      expect(next).not.toHaveBeenCalled();
    });

    test('should call next with error when signup fails', async () => {
      // Setup
      const req = { body: { email: 'test@example.com', password: 'password123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();
      const mockError = new Error('Signup failed');
      
      authService.signupService.mockRejectedValue(mockError);

      // Execute
      await signup(req, res, next);

      // Verify
      expect(authService.signupService).toHaveBeenCalledWith(req.body);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('login', () => {
    test('should return token on successful login', async () => {
      // Setup
      const req = { body: { email: 'test@example.com', password: 'password123' } };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      const mockToken = 'mock.jwt.token';
      
      authService.loginService.mockResolvedValue(mockToken);

      // Execute
      await login(req, res, next);

      // Verify
      expect(authService.loginService).toHaveBeenCalledWith(req.body);
      expect(res.json).toHaveBeenCalledWith({ token: mockToken });
      expect(next).not.toHaveBeenCalled();
    });

    test('should call next with error when login fails', async () => {
      // Setup
      const req = { body: { email: 'test@example.com', password: 'password123' } };
      const res = {
        json: jest.fn()
      };
      const next = jest.fn();
      const mockError = new Error('Login failed');
      
      authService.loginService.mockRejectedValue(mockError);

      // Execute
      await login(req, res, next);

      // Verify
      expect(authService.loginService).toHaveBeenCalledWith(req.body);
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
});
