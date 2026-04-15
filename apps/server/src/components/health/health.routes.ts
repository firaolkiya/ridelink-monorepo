import { CBD_SERVICE_NAME, type HealthPayload } from "@cbd/core";
import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
	const body: HealthPayload = {
		status: "ok",
		service: CBD_SERVICE_NAME,
		timestamp: new Date().toISOString(),
	};
	res.json(body);
});
