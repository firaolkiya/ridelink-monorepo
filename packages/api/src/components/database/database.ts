import type {
	ApiUser,
	CreateUserInput,
	EditUserInput,
	SafeApiUser,
	UserDatabase,
} from "../../types.js";

function sanitizeUser(user: ApiUser): SafeApiUser {
	const { password: _password, ...safeUser } = user;
	return safeUser;
}

export class InMemoryUserDatabase implements UserDatabase {
	private usersById = new Map<string, ApiUser>();
	private emailToId = new Map<string, string>();
	private sequence = 1;

	constructor() {
		this.createUser({
			name: "Amina Admin",
			email: "admin@example.com",
			password: "admin123",
			role: "admin",
			status: "active",
		});

		this.createUser({
			name: "Mason Member",
			email: "member@example.com",
			password: "member123",
			role: "member",
			status: "active",
		});
	}

	createUser(input: CreateUserInput): SafeApiUser {
		const email = input.email.trim().toLowerCase();

		if (this.emailToId.has(email)) {
			throw new Error("USER_EMAIL_EXISTS");
		}

		const now = new Date().toISOString();
		const id = String(this.sequence++);
		const user: ApiUser = {
			id,
			name: input.name.trim(),
			email,
			password: input.password,
			role: input.role ?? "member",
			status: input.status ?? "active",
			createdAt: now,
			updatedAt: now,
		};

		this.usersById.set(id, user);
		this.emailToId.set(email, id);
		return sanitizeUser(user);
	}

	editUser(id: string, input: EditUserInput): SafeApiUser | null {
		const current = this.usersById.get(id);
		if (!current) {
			return null;
		}

		if (input.email) {
			const nextEmail = input.email.trim().toLowerCase();
			const usedById = this.emailToId.get(nextEmail);
			if (usedById && usedById !== id) {
				throw new Error("USER_EMAIL_EXISTS");
			}
			this.emailToId.delete(current.email);
			this.emailToId.set(nextEmail, id);
			current.email = nextEmail;
		}

		if (typeof input.name === "string") {
			current.name = input.name.trim();
		}
		if (typeof input.password === "string") {
			current.password = input.password;
		}
		if (typeof input.role === "string") {
			current.role = input.role;
		}
		if (typeof input.status === "string") {
			current.status = input.status;
		}

		current.updatedAt = new Date().toISOString();
		return sanitizeUser(current);
	}

	getUsers(): SafeApiUser[] {
		return [...this.usersById.values()].map(sanitizeUser);
	}

	findById(id: string): SafeApiUser | null {
		const user = this.usersById.get(id);
		return user ? sanitizeUser(user) : null;
	}

	findByEmail(email: string): ApiUser | null {
		const normalized = email.trim().toLowerCase();
		const id = this.emailToId.get(normalized);
		if (!id) {
			return null;
		}
		return this.usersById.get(id) ?? null;
	}
}
