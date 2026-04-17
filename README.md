# ridelink-monorepo

Monorepo for Ridelink services and shared libraries.

## Workspace structure

- `apps/mobile`: Flutter mobile app
- `apps/server`: Node.js + Express API
- `packages/shared`: shared constants and types
- `packages/core`: core exports used by apps/packages
- `packages/api-client`: typed API client

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

## Documentation

- [docs/README.md](docs/README.md)
- [docs/architecture.md](docs/architecture.md)
- [docs/server-api.md](docs/server-api.md)
- [docs/packages.md](docs/packages.md)
