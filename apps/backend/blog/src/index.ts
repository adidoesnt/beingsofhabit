import { Elysia } from "elysia";
import { healthPlugin, corsPlugin, postPlugin, userPlugin, loggerPlugin } from "./plugins";
import { database, logger } from "./utils";

try {
  const { PORT = 3004 } = process.env;

  await database.connect();

  const app = new Elysia()
    .onBeforeHandle(loggerPlugin())
    .use(healthPlugin())
    .use(corsPlugin())
    .use(postPlugin())
    .use(userPlugin())
    .listen(PORT);
  const { hostname, port } = app.server ?? {};

  if (!hostname || !port) {
    throw new Error("💀 Failed to start Elysia server");
  }

  logger.info(`🦊 Blog service is running at ${hostname}:${port}`);
} catch (error) {
  logger.error('Error starting blog service', error as Error);
  process.exit(1);
}
