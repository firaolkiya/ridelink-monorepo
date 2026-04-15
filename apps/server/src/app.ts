import cors from "cors";
import express from "express";
import { healthRouter } from "./components/health/health.routes.js";
import { pingRouter } from "./components/ping/ping.routes.js";
import { systemRouter } from "./components/system/system.routes.js";

export function createCbdApiApp() {
	const app = express();
	app.use(cors({ origin: true }));
	app.use(express.json());
	app.use("/health", healthRouter);
	app.use("/system", systemRouter);
	app.use("/ping", pingRouter);
	return app;
}
