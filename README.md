# Clinica Medical App

Full-stack MERN application for managing a medical clinic. The project is a monorepo with an Express API in `backend/` and a React client in `frontend/`.

**Author:** Ali Elmuzayn  
**Stack:** MongoDB · Express 5 · React 19 · Node.js 22 · TypeScript 6

## Project structure

```
03_clinica/
├── backend/     # Express API (TypeScript, ESM)
├── frontend/    # React SPA (Vite, Tailwind, shadcn/ui)
├── Dockerfile
└── package.json # Root scripts for both packages
```

## Prerequisites

- Node.js 22+
- npm
- MongoDB (local or remote) — required once database features are implemented

## Getting started

### 1. Install dependencies

From the repo root:

```bash
npm run install
```

### 2. Configure environment

Create `backend/.env`:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/clinica
```

### 3. Run development servers

Start backend and frontend in **separate terminals**:

```bash
# Terminal 1 — API at http://localhost:3000
npm run dev:backend

# Terminal 2 — app at http://localhost:5173
npm run dev:frontend
```

> The root `npm run dev` script runs both sequentially, so the frontend will not start while the backend is running. Use separate terminals instead.

## Available scripts

| Script | Description |
|---|---|
| `npm run install` | Install backend and frontend dependencies |
| `npm run dev:backend` | Start backend with hot reload |
| `npm run dev:frontend` | Start Vite dev server |
| `npm run build:backend` | Compile backend to `backend/dist/` |
| `npm run build:frontend` | Build frontend to `frontend/dist/` |
| `npm run build` | Build both packages |
| `npm run start:backend` | Run compiled backend (production) |

## Package documentation

- [Backend README](./backend/README.md) — API architecture, env vars, and backend scripts
- [Frontend README](./frontend/README.md) — UI stack, path aliases, and frontend scripts

## Current status

This is an early-stage scaffold:

- Backend exposes a health-style `GET /` route
- MVC folders exist (`controllers`, `routes`, `services`, `models`) but are mostly stubs
- MongoDB URI is configured; database connection and models are not wired yet
- Frontend is a Vite + React + shadcn/ui starter

## License

ISC
