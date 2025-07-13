# Recipme Backend

This is the backend service for **Recipme**, a recipe creation and versioning platform. It exposes a REST API built with **Express** and integrates with **Firebase Authentication** and **MongoDB**.

---

## Tech Stack

- **Node.js** with **TypeScript**
- **Express** web framework
- **Firebase Auth** (authentication)
- **MongoDB** (database)
- **express-actuator** (service health endpoints)
- **tsx** for fast TypeScript execution in development

---

## Getting Started

### 1. Clone and Install Dependencies

```bash
git clone git@github.com:alexwintle/recipme-backend.git
cd recipme-backend
npm install
```

## 2. Development Mode

Use this during development for hot-reloading and fast compilation with tsx:

```bash 
npm run dev
```

To check the service is running, send a request to the health actuator endpoint:

e.g.
```bash
curl http://localhost:3000/actuator/health
```

> [!IMPORTANT]
> This will only work if you're running in development mode, where AUTH_ENABLED is set to false (the default). In production, this request would require a valid Firebase token.

- Runs the app with file watching and fast TypeScript transpilation.
- No need to manually build the project.

## 3. Production Build & Run

### Build

Compile your TypeScript code into JavaScript:

```bash
npm run build
```

This will generate a `dist/` folder with compiled files.

### Start

Run the built code:

```bash
npm start
```

Runs `node dist/app.js` to start the app in production mode.

## Running with Docker

With the docker daemon running, run the command following commands to run the service (mongo & backend) in detached mode:

### Development Mode

```bash
docker-compose -f docker/docker-compose.api-dev.yml up -d
```

### Production

```bash
docker-compose -f docker/docker-compose.yml up -d
```

## Project Structure
```
recipme-backend
├─ Dockerfile
├─ eslint.config.js
├─ jest.config.ts
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ app.ts
│  ├─ controller
│  ├─ model
│  ├─ repository
│  ├─ routes
│  ├─ types
│  └─ __tests__
│     ├─ integration
│     └─ unit
└─ tsconfig.json
```

## Authentication

This backend expects Firebase ID tokens in requests for protected routes.

- Users authenticate via Firebase on the frontend.
- The token is sent in the Authorization header (Bearer <token>) on API calls.
- The backend uses the Firebase Admin SDK to verify tokens and extract user identity.

## Actuator Endpoints

The backend provides health and monitoring endpoints using express-actuator.
Use these built-in endpoints to monitor the health of the service:

| Endpoint                | Description                                                                |
| ----------------------- | -------------------------------------------------------------------------- |
| `GET /actuator/health`  | Service health check                                                       |
| `GET /actuator/info`    | App version or metadata                                                    |
| `GET /actuator/metrics` | Basic app metrics                |
| `GET /actuator/list`    | 🛠 Custom route: lists all available actuator endpoints (excluding itself) |
