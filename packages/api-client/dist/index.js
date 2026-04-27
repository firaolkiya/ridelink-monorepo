async function parseJson(res) {
    return (await res.json());
}
export function createBackendApiClient(options) {
    const baseUrl = options.baseUrl.replace(/\/$/, "");
    const fetchFn = options.fetchImpl ?? globalThis.fetch;
    async function request(path, init) {
        const response = await fetchFn(`${baseUrl}${path}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...(init?.headers ?? {}),
            },
            ...init,
        });
        if (!response.ok) {
            let details = "";
            try {
                const payload = await response.json();
                details = payload?.error ? ` (${String(payload.error)})` : "";
            }
            catch {
                details = "";
            }
            throw new Error(`Backend API ${path} failed: ${response.status}${details}`);
        }
        return parseJson(response);
    }
    return {
        login: (payload) => request("/login", {
            method: "POST",
            body: JSON.stringify(payload),
        }),
        createUser: (payload) => request("/users", {
            method: "POST",
            body: JSON.stringify(payload),
        }),
        editUser: (id, payload) => request(`/users/${id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        }),
        getUsers: () => request("/users"),
    };
}
//# sourceMappingURL=index.js.map