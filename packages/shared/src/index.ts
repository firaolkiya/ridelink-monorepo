/** Shared contract for CBD apps and @cbd/api-client */

export const CBD_SERVICE_NAME = "ridelink-cbd" as const;
export const CBD_API_VERSION = "0.1.0" as const;

export type HealthStatus = "ok" | "degraded";

export interface HealthPayload {
	status: HealthStatus;
	service: typeof CBD_SERVICE_NAME;
	timestamp: string;
}

export interface SystemInfoPayload {
	service: typeof CBD_SERVICE_NAME;
	version: typeof CBD_API_VERSION;
	uptimeSeconds: number;
	node: string;
}

export interface PingPayload {
	pong: true;
	at: string;
}
