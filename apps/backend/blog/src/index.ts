import { Elysia } from "elysia";
import { healthPlugin, corsPlugin, postPlugin, userPlugin } from "./plugins";
import { database, logger } from "./utils";

try {
  const { PORT = 3004, NODE_ENV = "PROD" } = process.env;

  await database.connect();

  const app = new Elysia()
    .onBeforeHandle(({ request, path }) => {
      const method = request.method.toUpperCase();
      logger.info(`${method} ${path}`);
    })
    .use(healthPlugin())
    .use(corsPlugin())
    .use(postPlugin())
    .use(userPlugin())
    .listen(PORT);
  const { hostname, port } = app.server ?? {};

  if (!hostname || !port) {
    throw new Error("💀 Failed to start Elysia server");
  }

  const prefix = NODE_ENV === "DEV" ? "http://" : "https://";
  logger.info(`🦊 Blog service is running at ${prefix}${hostname}:${port}`);
} catch (error) {
  logger.error('Error starting blog service', error as Error);
  process.exit(1);
}
