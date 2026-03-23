/**
 * Typed HTTP client for the CBD API (web + mobile can share this package).
 */
export function createCbdApiClient(options) {
    const base = options.baseUrl.replace(/\/$/, "");
    const fetchFn = options.fetchImpl ?? globalThis.fetch;
    async function getJson(path) {
        const res = await fetchFn(`${base}${path}`, {
            headers: { Accept: "application/json" },
        });
        if (!res.ok) {
            throw new Error(`CBD API ${path} failed: ${res.status}`);
        }
        return res.json();
    }
    return {
        getHealth: () => getJson("/health"),
        getSystem: () => getJson("/system"),
        ping: () => getJson("/ping"),
    };
}
//# sourceMappingURL=index.js.map