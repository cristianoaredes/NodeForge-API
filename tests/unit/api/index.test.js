// Mock dependencies before requiring the module
jest.mock('express', () => {
  const mockApp = {
    use: jest.fn(),
    get: jest.fn(),
    listen: jest.fn((port, host, callback) => {
      callback();
      return { on: jest.fn() };
    })
  };

  const mockExpress = jest.fn(() => mockApp);
  mockExpress.json = jest.fn();
  mockExpress.static = jest.fn();
  mockExpress.Router = jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }));

  return mockExpress;
});

jest.mock('swagger-ui-express', () => ({
  serve: 'mock-serve',
  setup: jest.fn()
}));

jest.mock('yamljs', () => ({
  load: jest.fn(() => ({}))
}));

jest.mock('../../../src/features/auth/routes/authRoutes', () => ({}));

// Now require the module after mocking
const app = require('../../../src/api/index');

describe('API Server', () => {
  // Save original console.log
  const originalConsoleLog = console.log;

  beforeEach(() => {
    // Mock console.log to prevent output during tests
    console.log = jest.fn();
  });

  afterEach(() => {
    // Restore console.log
    console.log = originalConsoleLog;
  });

  test('should export app module', () => {
    // Just verify that the app module is exported correctly
    expect(app).toBeDefined();
  });
});
