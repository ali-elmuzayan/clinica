# Clinica Frontend

React single-page application for the Clinica medical app, built with Vite, Tailwind CSS, and shadcn/ui.

## Tech stack

- **UI:** React 19
- **Build tool:** Vite 8
- **Language:** TypeScript 6
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui 4 (Radix UI primitives)
- **Icons:** Lucide React
- **Font:** Inter (variable)

## Prerequisites

- Node.js 22+
- npm

## Setup

```bash
# From repo root
npm run install:frontend

# Or from this directory
npm install
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Development

```bash
npm run dev
```

App runs at **http://localhost:5173**.

Run the backend API separately (see [backend README](../backend/README.md)) if you need to call the server during development.

## Project structure

```
src/
├── main.tsx              # React entry point
├── App.tsx               # Root component
├── index.css             # Tailwind + shadcn theme tokens
├── lib/
│   └── utils.ts          # cn() className helper
└── components/
    └── ui/               # shadcn/ui primitives
        └── button.tsx
```

## Path aliases

Configured in `vite.config.ts` and `components.json`:

| Alias | Maps to |
|---|---|
| `@/` | `src/` |
| `@/components` | `src/components` |
| `@/components/ui` | `src/components/ui` |
| `@/lib/utils` | `src/lib/utils` |
| `@/hooks` | `src/hooks` (directory not yet created) |

Example:

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

## shadcn/ui

Components are added via the shadcn CLI. Configuration lives in `components.json` at the project root of this package.

To add a component:

```bash
npx shadcn@latest add <component-name>
```

New components are placed in `src/components/ui/`.

## Production build

```bash
npm run build
```

Output is written to `frontend/dist/`.

Preview the build locally:

```bash
npm run preview
```

## Not yet implemented

- API client (fetch/axios wrapper)
- Client-side routing (e.g. react-router)
- State management (Zustand, Redux, or Context)
- Authentication flow

## Notes

- React StrictMode is enabled in `main.tsx`
- There is no `start` script — use `npm run dev` for development or `npm run preview` after building
