import { Elysia } from "elysia";
// import logger and health plugins
// import logger util

try {
  const { PORT = 3002 } = process.env;

  // connect to database here

  const app = new Elysia()
    // add plugins here
    .listen(PORT);
  const { hostname, port } = app.server ?? {};

  if (!hostname || !port) {
    throw new Error("💀 Failed to start Elysia server");
  }

  // logger.info(`🦊 Blog service is running at ${hostname}:${port}`);
} catch (error) {
  // logger.error('Error starting blog service', error as Error);
  process.exit(1);
}
