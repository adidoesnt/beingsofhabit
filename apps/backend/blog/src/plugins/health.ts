import { Elysia } from "elysia";

export const healthPlugin = new Elysia()
  .decorate("health", "Blog service is healthy!")
  .all("/", ({ health }) => health)
  .all("/health", ({ health }) => health);
