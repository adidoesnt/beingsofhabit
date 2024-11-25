import { Elysia } from "elysia";
import { Logger } from "@/packages/utils/logger";

export type GetHealthPluginProps = {
  logger: Logger;
};

export const healthPlugin =
  ({ logger }: GetHealthPluginProps) =>
  () => {
    logger.info("Setting up health plugin");

    return new Elysia()
      .decorate("health", "Blog service is healthy!")
      .all("/", ({ health }) => health)
      .all("/health", ({ health }) => health);
  };
