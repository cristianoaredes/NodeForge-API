const express = require('express');
const logger = require('../core/logger');
const errorHandler = require('../core/errorHandler');
const config = require('../config');
const authMiddleware = require('../features/auth/middleware/authMiddleware');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();
const port = config.port || 3000;

// Swagger UI setup
const swaggerDocument = YAML.load(path.join(__dirname, '../../docs/openapi.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger);
app.use(express.json());
app.use('/auth', require('../features/auth/routes/authRoutes'));
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected resource', user: req.user });
});

app.get('/', (req, res) => {
  res.send('API is running');
});

// Global error handler
app.use(errorHandler);

module.exports = app;

if (require.main === module) {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
    console.log(`Swagger UI available at http://localhost:${port}/docs`);
  });
}
