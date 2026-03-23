import { CBD_API_VERSION, CBD_SERVICE_NAME } from "@cbd/core";
import { Router } from "express";
export const systemRouter = Router();
systemRouter.get("/", (_req, res) => {
    const body = {
        service: CBD_SERVICE_NAME,
        version: CBD_API_VERSION,
        uptimeSeconds: Math.floor(process.uptime()),
        node: process.version,
    };
    res.json(body);
});
//# sourceMappingURL=system.routes.js.map