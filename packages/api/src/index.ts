import type { HealthPayload, PingPayload, SystemInfoPayload } from "@cbd/core";

export type { HealthPayload, PingPayload, SystemInfoPayload } from "@cbd/core";

export interface CbdApiClientOptions {
	baseUrl: string;
	fetchImpl?: typeof fetch;
}

/**
 * Typed HTTP client for the CBD API (web + mobile can share this package).
 */
export function createCbdApiClient(options: CbdApiClientOptions) {
	const base = options.baseUrl.replace(/\/$/, "");
	const fetchFn = options.fetchImpl ?? globalThis.fetch;

	async function getJson<T>(path: string): Promise<T> {
		const res = await fetchFn(`${base}${path}`, {
			headers: { Accept: "application/json" },
		});
		if (!res.ok) {
			throw new Error(`CBD API ${path} failed: ${res.status}`);
		}
		return res.json() as Promise<T>;
	}

	return {
		getHealth: () => getJson<HealthPayload>("/health"),
		getSystem: () => getJson<SystemInfoPayload>("/system"),
		ping: () => getJson<PingPayload>("/ping"),
	};
}
