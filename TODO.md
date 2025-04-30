# TODO - Project Tasks by Phase

## Phase 1: Project Setup
- [x] Initialize package.json with required dependencies (Express, JWT, etc.)
- [x] Set up basic project structure (create directories: src/config, src/api, src/features/auth, src/core, src/infrastructure)
- [x] Create a basic Express server in src/api/index.js

## Phase 2: Configuration & Middleware
- [x] Create configuration files in src/config (for environment variables, JWT secret, etc.)
- [x] Implement error handling middleware in src/core
- [x] Set up logging and basic request validation

## Phase 3: Authentication Feature
- [x] Create Auth Module directories (controllers, routes, services, repositories)
- [x] Implement signup and login controllers in src/features/auth/controllers
- [x] Define Express routes for auth in src/features/auth/routes
- [x] Develop authentication use-cases in src/features/auth/services
- [x] Set up the user repository for managing user data (in-memory or database)

## Phase 4: Authentication Functionality
- [x] Implement JWT token generation and verification
- [x] Create middleware to protect routes using JWT
- [x] Write tests for signup, login, and token validation

## Phase 5: Finalizing & Documentation
- [x] Create documentation for API endpoints (README or separate documentation file)
- [x] Review code and clean up any unused code or comments
- [x] Mark final tasks as completed

---

## Phase 6: API Documentation with Swagger UI
- [x] Install swagger-ui-express and yamljs
- [x] Create docs/openapi.yaml with OpenAPI specification
- [x] Integrate Swagger UI at /docs endpoint in src/api/index.js
- [x] Document all endpoints and security in openapi.yaml
- [x] Update README with Swagger UI usage instructions

Each item above should be updated in the TODO.md file as tasks are completed.
