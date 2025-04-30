const jwt = require('jsonwebtoken');
const { signupService, loginService } = require('../../../../../src/features/auth/services/authService');
const userRepository = require('../../../../../src/features/auth/repositories/userRepository');

// Mock dependencies
jest.mock('jsonwebtoken');
jest.mock('../../../../../src/features/auth/repositories/userRepository');

describe('Auth Service', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('signupService', () => {
    test('should create a new user when email does not exist', async () => {
      // Setup
      const userData = { email: 'new@example.com', password: 'password123' };
      userRepository.findUserByEmail.mockResolvedValue(null);
      userRepository.createUser.mockResolvedValue({ email: userData.email });

      // Execute
      const result = await signupService(userData);

      // Verify
      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(userRepository.createUser).toHaveBeenCalledWith(userData);
      expect(result).toEqual({ email: userData.email });
    });

    test('should throw error when user already exists', async () => {
      // Setup
      const userData = { email: 'existing@example.com', password: 'password123' };
      userRepository.findUserByEmail.mockResolvedValue({ email: userData.email });

      // Execute & Verify
      await expect(signupService(userData)).rejects.toThrow('User already exists');
      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(userRepository.createUser).not.toHaveBeenCalled();
    });

    test('should set status 400 on error when user already exists', async () => {
      // Setup
      const userData = { email: 'existing@example.com', password: 'password123' };
      userRepository.findUserByEmail.mockResolvedValue({ email: userData.email });

      // Execute
      try {
        await signupService(userData);
        fail('Should have thrown an error');
      } catch (err) {
        // Verify
        expect(err.status).toBe(400);
        expect(err.message).toBe('User already exists');
      }
    });
  });

  describe('loginService', () => {
    test('should return JWT token when credentials are valid', async () => {
      // Setup
      const userData = { email: 'user@example.com', password: 'password123' };
      const mockToken = 'mock.jwt.token';
      userRepository.findUserByEmail.mockResolvedValue(userData);
      jwt.sign.mockReturnValue(mockToken);

      // Execute
      const result = await loginService(userData);

      // Verify
      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toBe(mockToken);
    });

    test('should throw error when user does not exist', async () => {
      // Setup
      const userData = { email: 'nonexistent@example.com', password: 'password123' };
      userRepository.findUserByEmail.mockResolvedValue(null);

      // Execute & Verify
      await expect(loginService(userData)).rejects.toThrow('Invalid credentials');
      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    test('should throw error when password is incorrect', async () => {
      // Setup
      const userData = { email: 'user@example.com', password: 'wrongpassword' };
      userRepository.findUserByEmail.mockResolvedValue({ 
        email: userData.email, 
        password: 'correctpassword' 
      });

      // Execute & Verify
      await expect(loginService(userData)).rejects.toThrow('Invalid credentials');
      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    test('should set status 401 on error when credentials are invalid', async () => {
      // Setup
      const userData = { email: 'user@example.com', password: 'wrongpassword' };
      userRepository.findUserByEmail.mockResolvedValue({ 
        email: userData.email, 
        password: 'correctpassword' 
      });

      // Execute
      try {
        await loginService(userData);
        fail('Should have thrown an error');
      } catch (err) {
        // Verify
        expect(err.status).toBe(401);
        expect(err.message).toBe('Invalid credentials');
      }
    });
  });
});
