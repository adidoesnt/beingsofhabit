import { Elysia } from "elysia";
import { CreatePostBodyType, GetPostQueryType, UpdatePostBodyType } from "../model";
import { postService } from "../service";
import { Status } from "../constants";
import { authPlugin, AuthPluginProps } from "./auth";

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
    .onBeforeHandle(({ cookie, set }) =>
      authPlugin({ cookie, set: set as AuthPluginProps["set"] }),
    )
    .get("/:postId", async ({ params, set }) => {
      try {
        const post = await postService.findById(params.postId);
        if (!post) throw new Error("No post returned");

        set.status = Status.OK;

        return post.toJSON();
      } catch (error) {
        set.status = Status.INTERNAL_SERVER_ERROR;

        const errMessage = "💀 Failed to get post:";
        console.error(errMessage, error);

        return errMessage;
      }
    })
    .put("/:postId", async ({ params, body, set }) => {
      try {
        const post = await postService.updatePost(params.postId, body);
        if (!post) throw new Error("No post returned");

        set.status = Status.OK;

        return post.toJSON();
      } catch (error) {
        set.status = Status.INTERNAL_SERVER_ERROR;

        const errMessage = "💀 Failed to update post:";
        console.error(errMessage, error);

        return errMessage;
      }
    }, {
      body: UpdatePostBodyType,
    })
    .post(
      "/",
      async ({ body, set }) => {
        try {
          const post = await postService.createPost(body);
          if (!post) throw new Error("No post returned");

          set.status = Status.CREATED;

          return post.toJSON();
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
