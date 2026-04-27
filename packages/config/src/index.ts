export interface ApiConfig {
	port: number;
	baseUrl: string;
}

function parsePort(value: string | undefined, fallback: number): number {
	if (!value) {
		return fallback;
	}
	const parsed = Number.parseInt(value, 10);
	if (Number.isNaN(parsed) || parsed <= 0) {
		return fallback;
	}
	return parsed;
}

export function createApiConfig(env: NodeJS.ProcessEnv = process.env): ApiConfig {
	const port = parsePort(env.CBD_API_PORT, 4001);
	const baseUrl = env.CBD_API_BASE_URL ?? `http://localhost:${port}`;
	return { port, baseUrl };
}
