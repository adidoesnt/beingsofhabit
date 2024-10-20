import { Elysia } from "elysia";
import { CreatePostBodyType, GetPostQueryType } from "../model";
import { postService } from "../service";
import { Status } from "../constants";
import { authPlugin } from "./auth";

export const postPlugin = () => {
  console.log("Setting up post plugin");

  return new Elysia({
    prefix: "/posts",
  })
    .get(
      "/",
      async ({ query, set }) => {
        try {
          const posts = await postService.getPosts(
            query.releaseDate,
            query.category
          );

          set.status = Status.OK;

          return posts;
        } catch (error) {
          set.status = Status.INTERNAL_SERVER_ERROR;

          const errMessage = "💀 Failed to get posts:";
          console.error(errMessage, error);

          return errMessage;
        }
      },
      {
        query: GetPostQueryType,
      }
    )
    .use(authPlugin())
    .post(
      "/",
      ({ body, set }) => {
        try {
          const post = postService.createPost(body);

          set.status = Status.CREATED;

          return post;
        } catch (error) {
          set.status = Status.INTERNAL_SERVER_ERROR;

          const errMessage = "💀 Failed to create post:";
          console.error(errMessage, error);

          return errMessage;
        }
      },
      {
        body: CreatePostBodyType,
      }
    );
};
