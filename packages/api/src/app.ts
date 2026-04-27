import cors from "cors";
import express from "express";
import type { Express } from "express";

import { createAuthRouter } from "./components/auth/auth.routes.js";
import { InMemoryUserDatabase } from "./components/database/database.js";
import { createUsersRouter } from "./components/users/users.routes.js";

export function createApiApp(): Express {
	const app = express();
	const database = new InMemoryUserDatabase();

	app.use(cors());
	app.use(express.json());

	app.get("/health", (_req, res) => {
		res.json({ status: "ok", service: "ridelink-api", timestamp: new Date().toISOString() });
	});

	app.use(createAuthRouter(database));
	app.use(createUsersRouter(database));

	return app;
}
