import { CBD_SERVICE_NAME } from "@cbd/core";
import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
    const body = {
        status: "ok",
        service: CBD_SERVICE_NAME,
        timestamp: new Date().toISOString(),
    };
    res.json(body);
});
//# sourceMappingURL=health.routes.js.map