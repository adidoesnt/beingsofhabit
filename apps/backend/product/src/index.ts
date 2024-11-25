import { Elysia } from "elysia";
import { loggerPlugin, healthPlugin } from "@/packages/plugins";
import { logger, database } from "./utils";

try {
  const { PORT = 3002 } = process.env;

  await database.init();

  const app = new Elysia()
    .onBeforeHandle(loggerPlugin({ logger }))
    .use(healthPlugin({ logger }))
    .listen(PORT);
  const { hostname, port } = app.server ?? {};

  if (!hostname || !port) {
    throw new Error("💀 Failed to start Elysia server");
  }

  logger.info(`🦊 Blog service is running at ${hostname}:${port}`);
} catch (error) {
  logger.error("Error starting blog service", error as Error);
  await database.close();
  process.exit(1);
}
