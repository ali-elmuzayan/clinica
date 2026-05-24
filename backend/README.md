# Clinica Backend

Express 5 REST API for the Clinica medical app, written in TypeScript with ESM.

## Tech stack

- **Runtime:** Node.js 22
- **Framework:** Express 5
- **Language:** TypeScript 6 (strict, NodeNext modules)
- **Dev runner:** tsx (watch mode)
- **Validation:** Zod (installed, not yet wired)
- **Auth utilities:** bcrypt, jsonwebtoken (installed, not yet wired)

## Prerequisites

- Node.js 22+
- npm
- MongoDB (for future database features)

## Setup

```bash
# From repo root
npm run install:backend

# Or from this directory
npm install
```

Create a `.env` file in this directory:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/clinica
```

Variables are loaded by `src/config/env.ts`. Defaults match the values above if `.env` is missing.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload (`tsx watch`) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled server (`node dist/index.js`) |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |

## Development

```bash
npm run dev
```

Server runs at **http://localhost:3000** (or the port set in `PORT`).

Current routes:

| Method | Path | Response |
|---|---|---|
| `GET` | `/` | `Hello World` |

## Project structure

```
src/
├── index.ts          # Entry point — creates app and starts server
├── app.ts            # Express factory (createApp)
├── config/
│   └── env.ts        # Environment variables
├── controllers/      # Request handlers
├── routes/           # Express routers
├── services/         # Business logic
├── models/           # Database schemas (pending)
├── middleware/       # Auth, error handling, etc.
├── validators/       # Zod request schemas
└── types/            # Shared TypeScript types
```

## Architecture

The backend follows a layered MVC pattern:

1. **Routes** — define endpoints and delegate to controllers
2. **Controllers** — handle HTTP request/response
3. **Services** — contain business logic
4. **Models** — define Mongoose schemas (not yet implemented)
5. **Validators** — Zod schemas for input validation
6. **Middleware** — cross-cutting concerns (auth, errors)

Routers are registered in `src/app.ts` via the `createApp()` factory.

## TypeScript conventions

- ESM throughout (`"type": "module"`)
- Local imports use the `.js` extension (required by NodeNext resolution)
- Strict mode enabled

Example:

```typescript
import createApp from "./app.js";
import { env } from "./config/env.js";
```

## Adding a new resource

1. Create a model in `src/models/<resource>.model.ts`
2. Add types in `src/types/<resource>.types.ts`
3. Add Zod validators in `src/validators/<resource>.validator.ts`
4. Implement logic in `src/services/<resource>.service.ts`
5. Add handlers in `src/controllers/<resource>.controller.ts`
6. Create a router in `src/routes/<resource>.router.ts`
7. Mount the router in `src/app.ts`

## Production

```bash
npm run build
npm start
```

## Notes

- `mongoose` is not installed yet — add it before implementing models
- `helmet`, `morgan`, `bcrypt`, `jsonwebtoken`, and `zod` are installed but not yet used in source
- MongoDB connection is not implemented despite `MONGO_URI` being configured
