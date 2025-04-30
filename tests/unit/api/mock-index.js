// This is a modified version of index.js for testing

const express = require('express');
const app = express();
const port = 3000;

// Mock the server startup code
if (true) { // Always execute this block for testing
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
    console.log(`Swagger UI available at http://localhost:${port}/docs`);
  });
}

module.exports = app;
