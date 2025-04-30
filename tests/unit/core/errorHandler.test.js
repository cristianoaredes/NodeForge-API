const errorHandler = require('../../../src/core/errorHandler');

describe('Error Handler', () => {
  test('should handle errors with status code', () => {
    const err = new Error('Test error');
    err.status = 400;
    
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
    
    // Mock console.error to prevent test output pollution
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    errorHandler(err, req, res, next);
    
    expect(console.error).toHaveBeenCalledWith(err);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Test error' });
    
    // Restore console.error
    console.error = originalConsoleError;
  });
  
  test('should handle errors without status code (default to 500)', () => {
    const err = new Error('Internal error');
    
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
    
    // Mock console.error to prevent test output pollution
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    errorHandler(err, req, res, next);
    
    expect(console.error).toHaveBeenCalledWith(err);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal error' });
    
    // Restore console.error
    console.error = originalConsoleError;
  });
  
  test('should handle errors without message (default message)', () => {
    const err = new Error();
    
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
    
    // Mock console.error to prevent test output pollution
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    errorHandler(err, req, res, next);
    
    expect(console.error).toHaveBeenCalledWith(err);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    
    // Restore console.error
    console.error = originalConsoleError;
  });
});
