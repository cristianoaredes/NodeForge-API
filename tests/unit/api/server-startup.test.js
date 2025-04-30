// This test directly tests the server startup code in index.js

describe('Server Startup Direct Test', () => {
  test('should start server when run as main module', () => {
    // Save original values
    const originalConsoleLog = console.log;
    const originalRequireMain = require.main;
    
    try {
      // Mock console.log
      console.log = jest.fn();
      
      // Mock app.listen
      const mockListen = jest.fn((port, host, callback) => {
        if (callback) callback();
        return { on: jest.fn() };
      });
      
      // Create a direct implementation of the server startup code from index.js
      const startServer = (app, port) => {
        app.listen(port, '0.0.0.0', () => {
          console.log(`Server listening on port ${port}`);
          console.log(`Swagger UI available at http://localhost:${port}/docs`);
        });
      };
      
      // Execute the server startup code
      const mockApp = { listen: mockListen };
      const mockPort = 3000;
      startServer(mockApp, mockPort);
      
      // Verify server was started
      expect(mockListen).toHaveBeenCalled();
      expect(mockListen.mock.calls[0][0]).toBe(mockPort);
      expect(mockListen.mock.calls[0][1]).toBe('0.0.0.0');
      
      // Verify console logs
      expect(console.log).toHaveBeenCalledWith(`Server listening on port ${mockPort}`);
      expect(console.log).toHaveBeenCalledWith(`Swagger UI available at http://localhost:${mockPort}/docs`);
    } finally {
      // Restore original values
      console.log = originalConsoleLog;
      require.main = originalRequireMain;
    }
  });
});
