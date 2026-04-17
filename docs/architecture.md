# Architecture

## Overview

The repository is organized as a pnpm workspace monorepo:

- `apps/*` for runnable applications
- `packages/*` for reusable libraries

Workspace config is defined in [../pnpm-workspace.yaml](../pnpm-workspace.yaml).

## Applications

### `apps/server`

- Express API service
- Entry point: [../apps/server/src/server.ts](../apps/server/src/server.ts)
- App wiring: [../apps/server/src/app.ts](../apps/server/src/app.ts)

### `apps/mobile`

- Flutter client app
- Entry point: [../apps/mobile/lib/main.dart](../apps/mobile/lib/main.dart)

## Shared packages

### `@cbd/shared`

- Source of shared constants and payload types
- File: [../packages/shared/src/index.ts](../packages/shared/src/index.ts)

### `@cbd/core`

- Core package consumed by server and client packages
- Depends on `@cbd/shared`

### `@cbd/api-client`

- Typed HTTP client for server endpoints
- File: [../packages/api-client/src/index.ts](../packages/api-client/src/index.ts)

## Dependency flow

`@cbd/shared` -> `@cbd/core` -> (`apps/server`, `@cbd/api-client`)

This keeps API contracts centralized and reusable across apps.
