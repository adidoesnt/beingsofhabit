import { Elysia } from "elysia";
import { healthPlugin, corsPlugin } from "./plugins";
import { UserModel } from "./model";

try {
  const { PORT = 3004, NODE_ENV = "PROD" } = process.env;

  const app = new Elysia().use(healthPlugin()).use(corsPlugin()).listen(PORT);
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
