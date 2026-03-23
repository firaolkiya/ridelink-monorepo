import type { HealthPayload, PingPayload, SystemInfoPayload } from "@cbd/core";
export type { HealthPayload, PingPayload, SystemInfoPayload } from "@cbd/core";
export interface CbdApiClientOptions {
    baseUrl: string;
    fetchImpl?: typeof fetch;
}
/**
 * Typed HTTP client for the CBD API (web + mobile can share this package).
 */
export declare function createCbdApiClient(options: CbdApiClientOptions): {
    getHealth: () => Promise<HealthPayload>;
    getSystem: () => Promise<SystemInfoPayload>;
    ping: () => Promise<PingPayload>;
};
//# sourceMappingURL=index.d.ts.map