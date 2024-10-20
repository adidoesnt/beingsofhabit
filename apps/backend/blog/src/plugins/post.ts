import { Elysia } from "elysia";
import { CreatePostBodyType, GetPostQueryType } from "../model";

export const postPlugin = () => {
  console.log("Setting up post plugin");

  return new Elysia({
    prefix: "/posts",
  })
    .get("/", ({ query }) => query, {
      query: GetPostQueryType,
    })
    .post("/", ({ body }) => body, {
      body: CreatePostBodyType,
    });
};
