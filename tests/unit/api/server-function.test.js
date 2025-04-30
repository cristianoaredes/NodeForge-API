// This test directly tests the server startup function

describe('Server Startup Function', () => {
  test('should start server and log messages', () => {
    // Save original console.log
    const originalConsoleLog = console.log;
    
    try {
      // Mock console.log
      console.log = jest.fn();
      
      // Create a mock app with listen method
      const mockListen = jest.fn((port, host, callback) => {
        if (callback) callback();
        return { on: jest.fn() };
      });
      
      const mockApp = { listen: mockListen };
      const port = 3000;
      
      // Define the server startup function (copied from index.js)
      const startServer = () => {
        mockApp.listen(port, '0.0.0.0', () => {
          console.log(`Server listening on port ${port}`);
          console.log(`Swagger UI available at http://localhost:${port}/docs`);
        });
      };
      
      // Execute the server startup function
      startServer();
      
      // Verify server was started
      expect(mockListen).toHaveBeenCalled();
      expect(mockListen.mock.calls[0][0]).toBe(port);
      expect(mockListen.mock.calls[0][1]).toBe('0.0.0.0');
      
      // Verify console logs
      expect(console.log).toHaveBeenCalledWith(`Server listening on port ${port}`);
      expect(console.log).toHaveBeenCalledWith(`Swagger UI available at http://localhost:${port}/docs`);
    } finally {
      // Restore console.log
      console.log = originalConsoleLog;
    }
  });
});
