import { Elysia } from "elysia";
import { healthPlugin, corsPlugin, postPlugin } from "./plugins";
import { database } from "./utils";

try {
  const { PORT = 3004, NODE_ENV = "PROD" } = process.env;

  await database.connect();

  const app = new Elysia()
    .use(healthPlugin())
    .use(corsPlugin())
    .use(postPlugin())
    .listen(PORT);
  const { hostname, port } = app.server ?? {};

  if (!hostname || !port) {
    throw new Error("💀 Failed to start Elysia server");
  }

  const prefix = NODE_ENV === "DEV" ? "http://" : "https://";
  console.log(`🦊 Blog service is running at ${prefix}${hostname}:${port}`);
} catch (error) {
  console.error(error);
  process.exit(1);
}
