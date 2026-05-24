# Clinica Medical App — CLAUDE.md

## Project Overview

Clinica is a full-stack MERN application for a medical clinic. It is structured as a monorepo with a dedicated `backend/` (Express + TypeScript) and `frontend/` (React + Vite + shadcn/ui) directory, orchestrated from the root `package.json`.

**Author:** Ali Elmuzayn  
**Stack:** MongoDB · Express 5 · React 19 · Node.js 22  
**Languages:** TypeScript 6 (both sides), ESM throughout

---

## Repository Structure

```
03_clinica/
├── package.json            # Root orchestration scripts
├── Dockerfile
├── .gitignore
├── .dockerignore
├── backend/
│   ├── package.json
│   ├── tsconfig.json       # ESM, NodeNext, strict
│   ├── eslint.config.js
│   ├── .prettierrc
│   ├── .env                # gitignored — see Environment section
│   └── src/
│       ├── index.ts        # Server entry point
│       ├── app.ts          # Express factory (createApp)
│       ├── config/
│       │   └── env.ts      # Typed env vars (PORT, NODE_ENV, MONGO_URI)
│       ├── controllers/    # user.controller.ts (stub)
│       ├── routes/         # user.router.ts (stub)
│       ├── services/       # user.service.ts (stub)
│       ├── models/         # app.model.ts (stub)
│       ├── middleware/     # empty
│       ├── validators/     # empty
│       └── types/          # empty
└── frontend/
    ├── package.json
    ├── vite.config.ts      # @ alias → ./src, React + Tailwind plugins
    ├── components.json     # shadcn/ui config
    └── src/
        ├── main.tsx        # React 19 entry
        ├── App.tsx
        ├── index.css       # Tailwind 4 + shadcn theme tokens
        ├── lib/utils.ts    # cn() helper
        └── components/ui/ # shadcn components (Button added)
```

---

## Dev Commands

Run all commands from the **repo root** unless specified otherwise.

### Install dependencies

```bash
npm run install           # installs both backend and frontend
npm run install:backend   # backend only
npm run install:frontend  # frontend only
```

### Development

Start backend and frontend **in separate terminals** (the root `dev` script runs them sequentially, so the frontend never starts if the backend process blocks):

```bash
# Terminal 1
npm run dev:backend       # tsx watch → http://localhost:3000

# Terminal 2
npm run dev:frontend      # Vite → http://localhost:5173
```

Or from each subdirectory:

```bash
cd backend  && npm run dev
cd frontend && npm run dev
```

### Build

```bash
npm run build:backend     # tsc → backend/dist/
npm run build:frontend    # tsc -b && vite build → frontend/dist/
```

### Lint

```bash
cd backend  && npm run lint
cd backend  && npm run lint:fix
cd frontend && npm run lint
```

### Production start (after build)

```bash
npm run start:backend     # node dist/index.js
```

> **Note:** There is no `start` script in `frontend/package.json`; use `vite preview` instead.

---

## Environment Variables

Create `backend/.env` (not committed). The only required file is:

```
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/clinica
```

These are read by `backend/src/config/env.ts` with the defaults shown above.

---

## Backend Architecture

The backend uses an **Express factory pattern** with a layered MVC structure.

| Layer | Path | Purpose |
|---|---|---|
| Entry | `src/index.ts` | Creates app, starts HTTP server |
| App factory | `src/app.ts` | Registers middleware and routes |
| Config | `src/config/env.ts` | Typed environment variables |
| Routes | `src/routes/` | Express routers per resource |
| Controllers | `src/controllers/` | Request/response handlers |
| Services | `src/services/` | Business logic |
| Models | `src/models/` | Mongoose schemas (pending) |
| Middleware | `src/middleware/` | Auth, error handling, etc. |
| Validators | `src/validators/` | Zod schemas for request validation |
| Types | `src/types/` | Shared TypeScript types |

### Installed backend packages (not yet wired)

- `mongoose` — **not installed yet**; `MONGO_URI` is configured but no DB connection exists
- `helmet` — security headers middleware
- `morgan` — HTTP request logging
- `bcrypt` — password hashing
- `jsonwebtoken` — JWT auth
- `zod` — request validation
- `cors` — cross-origin (already in use in `app.ts`)

### TypeScript / ESM conventions

- `"module": "NodeNext"` — all local imports must use the `.js` extension (maps to `.ts` at compile time)
- `"strict": true` — all strict checks enabled
- Dev runner: `tsx watch` (no compile step needed in dev)

---

## Frontend Architecture

| Tool | Version | Notes |
|---|---|---|
| React | 19 | StrictMode enabled |
| Vite | 8 | `@` alias maps to `./src` |
| TypeScript | 6 | split `tsconfig.app.json` / `tsconfig.node.json` |
| Tailwind CSS | 4 | via `@tailwindcss/vite` plugin |
| shadcn/ui | 4 | neutral base color, Radix UI primitives |
| Lucide React | latest | icon library |
| Inter (variable) | — | primary font |

**Path alias:** `@/` → `src/`

**shadcn component paths (from `components.json`):**
- Components: `@/components`
- UI primitives: `@/components/ui`
- Utilities: `@/lib/utils`
- Hooks: `@/hooks` (directory not yet created)

**Not yet added:**
- API client (axios / fetch wrapper)
- Client-side routing (react-router)
- State management (Zustand / Redux / Context)

---

## Known Issues

1. **Root `dev` / `start` scripts** run backend then frontend sequentially — the frontend process never starts while the backend is running. Use separate terminals.
2. **Root `test:*` scripts** reference a `test` script that does not exist in either `backend/` or `frontend/package.json` — running `npm test` from root will fail.
3. **Root `start:frontend`** references a `start` script that does not exist in `frontend/package.json` — use `npm run dev:frontend` or `vite preview` instead.
4. **Dockerfile** copies `client/` but the directory is named `frontend/`. The Docker build will fail.
5. **No `docker-compose.yml`** — a local MongoDB instance must be running separately when developing.
6. **No `.env.example`** — new contributors must manually create `backend/.env`.
7. **MVC stubs are empty** — `user.controller.ts`, `user.router.ts`, `user.service.ts`, and `app.model.ts` exist but contain no code and are not imported in `app.ts`.
8. **`mongoose` not installed** — add it before implementing any model.

---

## Adding a New Feature (Recommended Workflow)

1. **Model** — add a Mongoose schema in `src/models/<resource>.model.ts`
2. **Types** — declare shared interfaces in `src/types/<resource>.types.ts`
3. **Validators** — add Zod schemas in `src/validators/<resource>.validator.ts`
4. **Service** — implement business logic in `src/services/<resource>.service.ts`
5. **Controller** — add Express handlers in `src/controllers/<resource>.controller.ts`
6. **Router** — create an Express router in `src/routes/<resource>.router.ts`
7. **Register** — import and mount the router in `src/app.ts`
