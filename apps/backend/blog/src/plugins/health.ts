import { Elysia } from "elysia";

export const healthPlugin = () => {
  console.log("Setting up health plugin");

  return new Elysia()
    .decorate("health", "Blog service is healthy!")
    .all("/", ({ health }) => health)
    .all("/health", ({ health }) => health);
};
