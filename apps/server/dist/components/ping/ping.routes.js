import { Router } from "express";
export const pingRouter = Router();
pingRouter.get("/", (_req, res) => {
    const body = {
        pong: true,
        at: new Date().toISOString(),
    };
    res.json(body);
});
//# sourceMappingURL=ping.routes.js.map