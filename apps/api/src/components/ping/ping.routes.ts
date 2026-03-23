import type { PingPayload } from "@cbd/core";
import { Router } from "express";

export const pingRouter = Router();

pingRouter.get("/", (_req, res) => {
	const body: PingPayload = {
		pong: true,
		at: new Date().toISOString(),
	};
	res.json(body);
});
