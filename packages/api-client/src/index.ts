export type UserRole = "admin" | "member";

export type UserStatus = "active" | "inactive";

export interface ApiUser {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	status: UserStatus;
	createdAt: string;
	updatedAt: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
	user: ApiUser;
}

export interface CreateUserRequest {
	name: string;
	email: string;
	password: string;
	role?: UserRole;
	status?: UserStatus;
}

export interface EditUserRequest {
	name?: string;
	email?: string;
	password?: string;
	role?: UserRole;
	status?: UserStatus;
}

export interface UsersResponse {
	users: ApiUser[];
}

export interface UserResponse {
	user: ApiUser;
}

export interface BackendApiClientOptions {
	baseUrl: string;
	fetchImpl?: typeof fetch;
}

async function parseJson<T>(res: Response): Promise<T> {
	return (await res.json()) as T;
}

export function createBackendApiClient(options: BackendApiClientOptions) {
	const baseUrl = options.baseUrl.replace(/\/$/, "");
	const fetchFn = options.fetchImpl ?? globalThis.fetch;

	async function request<T>(path: string, init?: RequestInit): Promise<T> {
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
			} catch {
				details = "";
			}
			throw new Error(`Backend API ${path} failed: ${response.status}${details}`);
		}

		return parseJson<T>(response);
	}

	return {
		login: (payload: LoginRequest) =>
			request<LoginResponse>("/login", {
				method: "POST",
				body: JSON.stringify(payload),
			}),
		createUser: (payload: CreateUserRequest) =>
			request<UserResponse>("/users", {
				method: "POST",
				body: JSON.stringify(payload),
			}),
		editUser: (id: string, payload: EditUserRequest) =>
			request<UserResponse>(`/users/${id}`, {
				method: "PATCH",
				body: JSON.stringify(payload),
			}),
		getUsers: () => request<UsersResponse>("/users"),
		getUser: (id: string) => request<UserResponse>(`/users/${id}`),
	};
}
