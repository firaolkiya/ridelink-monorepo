import { createApiConfig } from "@cbd/config";

import { createApiApp } from "./app.js";

const config = createApiConfig();
const app = createApiApp();

app.listen(config.port, () => {
	console.log(`Ridelink API listening on ${config.baseUrl}`);
});
