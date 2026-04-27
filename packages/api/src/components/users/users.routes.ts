import { Router } from "express";

import type { UserDatabase } from "../../types.js";

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

export function createUsersRouter(database: UserDatabase): Router {
	const router = Router();

	router.get("/users", (_req, res) => {
		res.json({ users: database.getUsers() });
	});

	router.post("/users", (req, res) => {
		const body = req.body as unknown;
		if (!isObject(body)) {
			res.status(400).json({ error: "INVALID_PAYLOAD" });
			return;
		}

		const name = body.name;
		const email = body.email;
		const password = body.password;
		const role = body.role;
		const status = body.status;

		if (
			typeof name !== "string" ||
			typeof email !== "string" ||
			typeof password !== "string" ||
			name.trim() === "" ||
			email.trim() === "" ||
			password.trim() === ""
		) {
			res.status(400).json({ error: "VALIDATION_ERROR", message: "name, email and password are required" });
			return;
		}

		try {
			const user = database.createUser({
				name,
				email,
				password,
				role: role === "admin" || role === "member" ? role : undefined,
				status: status === "active" || status === "inactive" ? status : undefined,
			});
			res.status(201).json({ user });
		} catch (error) {
			if (error instanceof Error && error.message === "USER_EMAIL_EXISTS") {
				res.status(409).json({ error: "USER_EMAIL_EXISTS" });
				return;
			}
			res.status(500).json({ error: "INTERNAL_ERROR" });
		}
	});

	router.patch("/users/:id", (req, res) => {
		const body = req.body as unknown;
		if (!isObject(body)) {
			res.status(400).json({ error: "INVALID_PAYLOAD" });
			return;
		}

		const id = req.params.id;
		if (!id) {
			res.status(400).json({ error: "USER_ID_REQUIRED" });
			return;
		}

		try {
			const user = database.editUser(id, {
				name: typeof body.name === "string" ? body.name : undefined,
				email: typeof body.email === "string" ? body.email : undefined,
				password: typeof body.password === "string" ? body.password : undefined,
				role: body.role === "admin" || body.role === "member" ? body.role : undefined,
				status: body.status === "active" || body.status === "inactive" ? body.status : undefined,
			});

			if (!user) {
				res.status(404).json({ error: "USER_NOT_FOUND" });
				return;
			}

			res.json({ user });
		} catch (error) {
			if (error instanceof Error && error.message === "USER_EMAIL_EXISTS") {
				res.status(409).json({ error: "USER_EMAIL_EXISTS" });
				return;
			}
			res.status(500).json({ error: "INTERNAL_ERROR" });
		}
	});

	return router;
}
