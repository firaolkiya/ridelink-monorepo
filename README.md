# ridelink-monorepo

Monorepo for Ridelink services and shared libraries.

This repo is organized around a component-based architecture:

- shared UI primitives and composites live in `packages/ui`
- typed backend access lives in `packages/api-client`
- app-specific composition lives in each app's feature folders

## Workspace structure

- `apps/mobile`: Flutter mobile app
- `apps/web`: web app (Vite + React)
- `apps/admin`: admin app (Vite + React)
- `packages/api`: Node.js + Express API package
- `packages/config`: shared runtime config helpers
- `packages/api-client`: typed API client
- `packages/ui`: reusable React UI primitives and composites

## Prerequisites

- Node.js 20+
- pnpm 10+
- Flutter SDK (for mobile app)

## Install dependencies

```bash
pnpm install
```

## Run server (dev)

```bash
pnpm --filter @cbd/api dev
```

Default API URL: `http://localhost:4001`

## Build all packages/apps

```bash
pnpm -r run build
```

## Component usage

- `apps/admin` uses `packages/ui`'s `AuthCard` composite and `packages/api-client` for member creation
- `apps/web` uses the same `AuthCard` composite and `packages/api-client` for sign-in
- app-specific page composition lives in `apps/admin/src/features` and `apps/web/src/features`

When adding reusable UI, prefer exporting it from `packages/ui/src/index.ts` and keep app-specific orchestration inside the app folder.

## Documentation

- [docs/README.md](docs/README.md)
- [docs/architecture.md](docs/architecture.md)
- [docs/server-api.md](docs/server-api.md)
- [docs/packages.md](docs/packages.md)
