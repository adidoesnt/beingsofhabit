import { Elysia } from "elysia";
import { logger } from "src/utils";

export const healthPlugin = () => {
  logger.info("Setting up health plugin");

  return new Elysia()
    .decorate("health", "Blog service is healthy!")
    .all("/", ({ health }) => health)
    .all("/health", ({ health }) => health);
};
