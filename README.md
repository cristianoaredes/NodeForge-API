# NodeForge API — Node.js REST API Boilerplate with JWT Authentication

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)
![Test Coverage](https://img.shields.io/badge/coverage-96%25-brightgreen)
![Docker](https://img.shields.io/badge/docker-ready-blue)

A production-ready **Node.js REST API starter** built with Express.js. Ships with JWT authentication, protected routes, Swagger docs, centralized error handling, and a 96%+ test coverage suite — ready to clone and build on.

## What is this?

NodeForge API is an **Express.js boilerplate** designed to eliminate the repetitive setup work when starting a new REST API. It provides a clean, feature-based project structure with a working **JWT authentication** flow out of the box, so you can focus on your domain logic instead of plumbing.

Use it as a **Node.js starter** for side projects, internal tools, or as a reference implementation of API best practices.

## Features

- **JWT Authentication** — signup, login, and token verification with `jsonwebtoken`
- **Protected Routes** — Bearer token middleware that guards any endpoint you choose
- **Swagger / OpenAPI Docs** — interactive API documentation served at `/docs`
- **Centralized Error Handling** — single error handler middleware; async errors propagate cleanly
- **HTTP Request Logging** — Morgan middleware logs every request
- **High Test Coverage** — 96%+ statement coverage with Jest + Supertest (unit and integration tests)
- **Docker Support** — multi-stage Alpine Linux image, non-root user, health check included
- **Environment Configuration** — `dotenv`-based config; one `.env` file controls everything
- **Feature-Based Structure** — controllers, services, repositories, and routes are co-located per feature

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (v14+) |
| Framework | Express.js v5 |
| Authentication | JSON Web Tokens (jsonwebtoken) |
| API Docs | Swagger UI + OpenAPI 3 |
| Logging | Morgan |
| Testing | Jest + Supertest |
| Containerization | Docker + Docker Compose |

## Project Structure

```
NodeForge-API/
├── docs/
│   └── openapi.yaml          # OpenAPI 3 spec (served at /docs)
├── src/
│   ├── api/
│   │   └── index.js          # Express app bootstrap
│   ├── config/
│   │   └── index.js          # Environment variable config
│   ├── core/
│   │   ├── errorHandler.js   # Global error handler middleware
│   │   └── logger.js         # Morgan HTTP logger
│   └── features/
│       └── auth/
│           ├── controllers/  # Request handlers
│           ├── middleware/   # JWT auth middleware
│           ├── repositories/ # In-memory user store
│           ├── routes/       # Route definitions
│           └── services/     # Business logic
├── tests/
│   ├── unit/                 # Unit tests per layer
│   ├── auth.test.js          # Auth integration tests
│   └── root.test.js          # Root endpoint test
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## Installation

**Prerequisites:** Node.js v14+, npm v6+

```bash
git clone https://github.com/cristianoaredes/NodeForge-API.git
cd NodeForge-API
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
PORT=3001
JWT_SECRET=your_strong_secret_here
```

## Running the Application

```bash
# Development (auto-reload with nodemon)
npm run dev

# Production
npm start
```

### Docker

```bash
# Build and start
docker-compose up -d

# View logs
docker logs nodeforge-api

# Stop
docker-compose down
```

The Docker image uses multi-stage builds, runs as a non-root user (`nodejs`), and includes a health check on port 3001.

## API Endpoints

Interactive docs are available at `http://localhost:3001/docs` once the server is running.

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|---|
| GET | `/` | No | Health check — returns `API is running` |
| POST | `/auth/signup` | No | Register a new user |
| POST | `/auth/login` | No | Authenticate and receive a JWT |
| GET | `/protected` | Yes | Example protected resource |

### Sign up

```bash
curl -X POST http://localhost:3001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

```json
{ "email": "user@example.com" }
```

### Log in

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

```json
{ "token": "<JWT>" }
```

### Access a protected route

```bash
curl http://localhost:3001/protected \
  -H "Authorization: Bearer <JWT>"
```

```json
{
  "message": "Protected resource",
  "user": { "email": "user@example.com" }
}
```

JWT tokens expire after **1 hour**. Missing or invalid tokens return `401 Unauthorized`.

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage report
npm test -- --coverage
```

### Coverage summary

| Metric | Coverage |
|---|---|
| Statements | 96.84% |
| Branches | 83.33% |
| Functions | 92.30% |
| Lines | 96.80% |

The test suite covers signup, login, protected route access (authorized and unauthorized), and core middleware behavior.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

Bug reports and suggestions are welcome in [Issues](https://github.com/cristianoaredes/NodeForge-API/issues).

## License

MIT — see the LICENSE file for details.

---

Built by [Cristiano Arêdes](https://github.com/cristianoaredes)

<!-- SEO: Node.js REST API, Express.js boilerplate, JWT authentication, Node.js starter, REST API template -->
