import { createCbdApiApp } from "./app.js";
const port = Number(process.env.CBD_API_PORT) || 4001;
const app = createCbdApiApp();
app.listen(port, () => {
    console.log(`CBD API listening on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map