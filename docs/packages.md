# Packages

## `@cbd/shared`

Purpose:

- Defines cross-app constants and API payload types

Build:

```bash
pnpm --filter @cbd/shared build
```

Files:

- [../packages/shared/package.json](../packages/shared/package.json)
- [../packages/shared/src/index.ts](../packages/shared/src/index.ts)

## `@cbd/core`

Purpose:

- Core shared package consumed by server and API client
- Depends on `@cbd/shared`

Build:

```bash
pnpm --filter @cbd/core build
```

Files:

- [../packages/core/package.json](../packages/core/package.json)
- [../packages/core/src/index.ts](../packages/core/src/index.ts)

## `@cbd/api-client`

Purpose:

- Typed client for `/health`, `/system`, `/ping`

Build:

```bash
pnpm --filter @cbd/api-client build
```

Files:

- [../packages/api-client/package.json](../packages/api-client/package.json)
- [../packages/api-client/src/index.ts](../packages/api-client/src/index.ts)

## Example usage

```ts
import { createCbdApiClient } from "@cbd/api-client";

const client = createCbdApiClient({ baseUrl: "http://localhost:4001" });
const health = await client.getHealth();
```
