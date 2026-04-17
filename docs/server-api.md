# Server API

## Run locally

From repo root:

```bash
pnpm --filter @cbd/api dev
```

Default port:

- `CBD_API_PORT` env var, fallback `4001`
- See [../apps/server/src/server.ts](../apps/server/src/server.ts)

## Base URL

`http://localhost:4001`

## Endpoints

### `GET /health`

Response shape (`HealthPayload`):

```json
{
  "status": "ok",
  "service": "ridelink-cbd",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

Route file: [../apps/server/src/components/health/health.routes.ts](../apps/server/src/components/health/health.routes.ts)

### `GET /system`

Response shape (`SystemInfoPayload`):

```json
{
  "service": "ridelink-cbd",
  "version": "0.1.0",
  "uptimeSeconds": 123,
  "node": "v22.x.x"
}
```

Route file: [../apps/server/src/components/system/system.routes.ts](../apps/server/src/components/system/system.routes.ts)

### `GET /ping`

Response shape (`PingPayload`):

```json
{
  "pong": true,
  "at": "2026-01-01T00:00:00.000Z"
}
```

Route file: [../apps/server/src/components/ping/ping.routes.ts](../apps/server/src/components/ping/ping.routes.ts)

## Shared contracts

Payload contracts are defined in:

- [../packages/shared/src/index.ts](../packages/shared/src/index.ts)
