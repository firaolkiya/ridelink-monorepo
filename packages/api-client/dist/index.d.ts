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
export declare function createBackendApiClient(options: BackendApiClientOptions): {
    login: (payload: LoginRequest) => Promise<LoginResponse>;
    createUser: (payload: CreateUserRequest) => Promise<UserResponse>;
    editUser: (id: string, payload: EditUserRequest) => Promise<UserResponse>;
    getUsers: () => Promise<UsersResponse>;
};
//# sourceMappingURL=index.d.ts.map