import { Router } from "express";

import type { UserDatabase } from "../../types.js";

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

export function createAuthRouter(database: UserDatabase): Router {
	const router = Router();

	router.post("/login", (req, res) => {
		const body = req.body as unknown;
		if (!isObject(body)) {
			res.status(400).json({ error: "INVALID_PAYLOAD" });
			return;
		}

		const email = body.email;
		const password = body.password;

		if (typeof email !== "string" || typeof password !== "string") {
			res.status(400).json({ error: "VALIDATION_ERROR", message: "email and password are required" });
			return;
		}

		const user = database.findByEmail(email);
		if (!user || user.password !== password) {
			res.status(401).json({ error: "INVALID_CREDENTIALS" });
			return;
		}

		res.json({
			token: `demo-token-${user.id}`,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
				status: user.status,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		});
	});

	return router;
}
