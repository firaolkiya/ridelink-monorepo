function parsePort(value, fallback) {
    if (!value) {
        return fallback;
    }
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed) || parsed <= 0) {
        return fallback;
    }
    return parsed;
}
export function createApiConfig(env = process.env) {
    const port = parsePort(env.CBD_API_PORT, 4001);
    const baseUrl = env.CBD_API_BASE_URL ?? `http://localhost:${port}`;
    return { port, baseUrl };
}
//# sourceMappingURL=index.js.map