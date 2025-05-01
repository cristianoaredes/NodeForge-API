# NodeForge API

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)
![Test Coverage](https://img.shields.io/badge/coverage-96%25-brightgreen)
![Docker](https://img.shields.io/badge/docker-ready-blue)

A robust, secure, and well-tested RESTful API built with Express.js, featuring authentication, protected routes, and comprehensive test coverage. This sample project demonstrates best practices for building Node.js APIs.

## 📋 Table of Contents

- [NodeForge API](#nodeforge-api)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🛠 Tech Stack](#-tech-stack)
  - [📁 Project Structure](#-project-structure)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
  - [🏃‍♂️ Running the Application](#️-running-the-application)
    - [Development Mode](#development-mode)
    - [Production Mode](#production-mode)
    - [Docker](#docker)
  - [📚 API Documentation](#-api-documentation)
    - [API Endpoints](#api-endpoints)
      - [Public Endpoints](#public-endpoints)
      - [Protected Endpoints](#protected-endpoints)
  - [🧪 Testing](#-testing)
    - [Running Tests](#running-tests)
    - [Test Structure](#test-structure)
  - [📊 Code Coverage](#-code-coverage)
  - [🔍 Implementation Details](#-implementation-details)
    - [Authentication Flow](#authentication-flow)
    - [Error Handling](#error-handling)
    - [Security Considerations](#security-considerations)
    - [Docker Configuration](#docker-configuration)
  - [🗺️ Roadmap](#️-roadmap)
    - [Phase 1: Core Infrastructure](#phase-1-core-infrastructure)
    - [Phase 2: Developer Experience](#phase-2-developer-experience)
    - [Phase 3: Operational Readiness](#phase-3-operational-readiness)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)
  - [📱 GitHub Repository](#-github-repository)

## ✨ Features

- **Authentication System**: Secure signup and login functionality with JWT
- **Protected Routes**: Middleware for securing endpoints
- **API Documentation**: Interactive Swagger UI documentation
- **Error Handling**: Centralized error handling mechanism
- **Environment Configuration**: Environment-based configuration
- **Logging**: HTTP request logging with Morgan
- **Testing**: Comprehensive test suite with Jest
- **Code Coverage**: High test coverage (>95%)
- **Docker Support**: Containerized deployment with secure Alpine Linux image
- **CI/CD Ready**: Easy integration with CI/CD pipelines

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JSON Web Tokens (JWT)
- **API Documentation**: Swagger UI + OpenAPI
- **Logging**: Morgan
- **Testing**: Jest + Supertest
- **Environment Variables**: dotenv
- **Containerization**: Docker + Docker Compose

## 📁 Project Structure

The project follows a feature-based structure for better organization and scalability:

```
.
├── docs/                  # Documentation files
│   └── openapi.yaml       # OpenAPI/Swagger specification
├── src/                   # Source code
│   ├── api/               # API entry point
│   │   └── index.js       # Express app setup and server initialization
│   ├── config/            # Configuration files
│   │   └── index.js       # Environment variables and app configuration
│   ├── core/              # Core components
│   │   ├── errorHandler.js # Global error handling middleware
│   │   └── logger.js      # HTTP request logger
│   └── features/          # Feature modules
│       └── auth/          # Authentication feature
│           ├── controllers/ # Request handlers
│           ├── middleware/  # Auth middleware
│           ├── repositories/ # Data access layer
│           ├── routes/      # Route definitions
│           └── services/    # Business logic
├── tests/                 # Test files
│   ├── unit/              # Unit tests
│   │   ├── api/           # API tests
│   │   ├── core/          # Core component tests
│   │   └── features/      # Feature tests
│   ├── auth.test.js       # Authentication integration tests
│   └── root.test.js       # Root endpoint tests
├── .env                   # Environment variables (not in version control)
├── .gitignore             # Git ignore file
├── nodemon.json           # Nodemon configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cristianoaredes/NodeForge-API.git
   cd NodeForge-API
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3001
JWT_SECRET=your_jwt_secret_key
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

This will start the server with nodemon for automatic reloading on file changes.

### Production Mode

```bash
npm start
```

### Docker

You can also run the application using Docker:

```bash
# Build and start the container
docker-compose up -d

# View logs
docker logs projeto-marcal-api

# Stop the container
docker-compose down
```

The Docker setup includes:
- Multi-stage builds for smaller images
- Non-root user for improved security
- Alpine Linux base image with minimal vulnerabilities
- Health checks for container monitoring

## 📚 API Documentation

Once the application is running, you can access the Swagger UI documentation at:

```
http://localhost:3001/docs
```

### API Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | / | API status check | No |
| POST | /auth/signup | Create a new user | No |
| POST | /auth/login | Authenticate user and get token | No |
| GET | /protected | Access protected resource | Yes |

#### Public Endpoints

- `POST /auth/signup`
  Request body:
  ```json
  { "email": "user@example.com", "password": "password123" }
  ```
  Response:
  ```json
  { "email": "user@example.com" }
  ```

- `POST /auth/login`
  Request body:
  ```json
  { "email": "user@example.com", "password": "password123" }
  ```
  Response:
  ```json
  { "token": "<JWT token>" }
  ```

- `GET /`
  Returns `API is running`

#### Protected Endpoints

- `GET /protected`
  Requires header:
  ```
  Authorization: Bearer <token>
  ```
  Response:
  ```json
  {
    "message": "Protected resource",
    "user": { "email": "user@example.com" }
  }
  ```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage
```

### Test Structure

- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test API endpoints and their interactions

## 📊 Code Coverage

The project maintains high test coverage:

- **Statements**: 96.84%
- **Branches**: 83.33%
- **Functions**: 92.3%
- **Lines**: 96.8%

## 🔍 Implementation Details

### Authentication Flow

1. **Signup**: Users register with email and password
2. **Login**: Users authenticate and receive a JWT token
3. **Protected Routes**: JWT token is verified for access to protected resources

### Error Handling

The application uses a centralized error handling mechanism that:

- Captures all errors thrown in async/await functions
- Returns appropriate HTTP status codes
- Provides meaningful error messages

### Security Considerations

- Passwords should be hashed before storage in a production environment
- JWT secrets should be strong and kept secure
- Environment variables should be properly managed
- Docker container runs as a non-root user for added security
- Alpine Linux image with minimal attack surface

### Docker Configuration

The application is containerized with Docker using best practices:

- **Multi-stage builds**: Separates build dependencies from runtime dependencies
- **Security**: Runs as non-root user (nodejs)
- **Base Image**: Uses Alpine Linux for minimal size and security vulnerabilities
- **Health Checks**: Configured to monitor container health
- **Docker Compose**: Easy orchestration with `docker-compose.yml`

## 🗺️ Roadmap

The following roadmap outlines the planned enhancements to transform this project into a fully production-ready API base:

### Phase 1: Core Infrastructure

**Database Integration**
- Implementation of ORM/ODM with Mongoose or Sequelize
- Proper connection pooling and error handling
- Database migration capabilities
- Transition from in-memory to database storage

**Enhanced Security**
- CORS configuration and security headers with Helmet
- Rate limiting for public endpoints
- CSRF protection
- Advanced password hashing
- IP-based blocking for failed auth attempts

**Advanced Validation**
- Request validation using Joi or express-validator
- Custom error messages for validation failures
- Integration with OpenAPI documentation

**Enhanced Logging & Monitoring**
- Structured, level-based logging with Winston or Pino
- Request ID tracking across request lifecycle
- Health check endpoints with detailed status monitoring
- Performance metrics collection

### Phase 2: Developer Experience

**API Versioning**
- Implementation of versioning strategy (URL, header, or content negotiation)
- Route structure supporting multiple API versions
- Version-specific documentation
- Upgrade path guidance for API consumers

**Documentation Enhancements**
- Enhanced Swagger/OpenAPI documentation with examples
- Postman collection for API testing
- Architecture diagrams
- Code documentation standards
- Developer onboarding guide

**Environment Configuration**
- Robust environment variable validation
- Environment-specific configurations
- Secure secrets management
- Comprehensive setup documentation

### Phase 3: Operational Readiness

**CI/CD Pipeline**
- Automated testing with GitHub Actions
- Linting and code quality checks
- Security vulnerability scanning
- Automated Docker image building and publishing
- Deployment workflow automation

**Caching Layer**
- Implementation of Redis or in-memory caching
- TTL-based cache management
- Cache invalidation strategies
- Distributed caching support
- Rate limit optimization

**Error Handling Improvements**
- Standardized error response structure
- Custom error classes for different scenarios
- Centralized error codes and messages
- Localization support for error messages
- Enhanced error context logging

For a detailed breakdown of these enhancements, see the [PLAN.md](PLAN.md) and [TODO.md](TODO.md) files in the repository.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📱 GitHub Repository

The project is hosted on GitHub at [https://github.com/cristianoaredes/NodeForge-API](https://github.com/cristianoaredes/NodeForge-API).

Feel free to:
- Star the repository if you find it useful
- Fork it to create your own version
- Submit issues or pull requests to contribute
- Use it as a template for your own Node.js API projects

---

Made with ❤️ by [Cristiano Aredes](https://github.com/cristianoaredes)
