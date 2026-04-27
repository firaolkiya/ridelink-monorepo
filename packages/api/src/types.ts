export type UserRole = "admin" | "member";

export type UserStatus = "active" | "inactive";

export interface ApiUser {
	id: string;
	name: string;
	email: string;
	password: string;
	role: UserRole;
	status: UserStatus;
	createdAt: string;
	updatedAt: string;
}

export type SafeApiUser = Omit<ApiUser, "password">;

export interface CreateUserInput {
	name: string;
	email: string;
	password: string;
	role?: UserRole;
	status?: UserStatus;
}

export interface EditUserInput {
	name?: string;
	email?: string;
	password?: string;
	role?: UserRole;
	status?: UserStatus;
}

export interface LoginInput {
	email: string;
	password: string;
}

export interface UserDatabase {
	createUser(input: CreateUserInput): SafeApiUser;
	editUser(id: string, input: EditUserInput): SafeApiUser | null;
	getUsers(): SafeApiUser[];
	findByEmail(email: string): ApiUser | null;
}
