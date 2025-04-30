const jwt = require('jsonwebtoken');
const authMiddleware = require('../../../../../src/features/auth/middleware/authMiddleware');
const config = require('../../../../../src/config');

// Mock dependencies
jest.mock('jsonwebtoken');
jest.mock('../../../../../src/config', () => ({
  jwtSecret: 'test-secret'
}));

describe('Auth Middleware', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('should call next() when token is valid', () => {
    // Setup
    const req = {
      headers: {
        authorization: 'Bearer valid.token.here'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
    const decodedToken = { email: 'user@example.com' };

    jwt.verify.mockReturnValue(decodedToken);

    // Execute
    authMiddleware(req, res, next);

    // Verify
    expect(jwt.verify).toHaveBeenCalledWith('valid.token.here', config.jwtSecret);
    expect(req.user).toEqual(decodedToken);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('should return 401 when no authorization header is provided', () => {
    // Setup
    const req = { headers: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    // Execute
    authMiddleware(req, res, next);

    // Verify
    expect(jwt.verify).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'No token provided' });
  });

  test('should return 401 when authorization header does not contain Bearer token', () => {
    // Setup
    const req = {
      headers: {
        authorization: 'InvalidFormat'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    // Mock jwt.verify to throw an error
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    // Execute
    authMiddleware(req, res, next);

    // Verify
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
  });

  test('should return 401 when token is invalid', () => {
    // Setup
    const req = {
      headers: {
        authorization: 'Bearer invalid.token'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    // Execute
    authMiddleware(req, res, next);

    // Verify
    expect(jwt.verify).toHaveBeenCalledWith('invalid.token', config.jwtSecret);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
  });
});
