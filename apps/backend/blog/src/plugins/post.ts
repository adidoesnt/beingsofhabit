import { Elysia } from "elysia";
import { CreatePostBodyType, GetPostQueryType, UpdatePostBodyType } from "../model";
import { postService } from "../service";
import { authPlugin, AuthPluginProps } from "./auth";
import { BlogPortalPostError, BlogPortalPostErrorMessage } from "@/packages/types/error";
import { Status } from "@/packages/types/response";

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
        if (!post) throw new BlogPortalPostError(BlogPortalPostErrorMessage.POST_NOT_FOUND, Status.NOT_FOUND);

        set.status = Status.OK;

        return post.toJSON();
      } catch (e) {
        const error = e as BlogPortalPostError;
        set.status = error.status ?? Status.INTERNAL_SERVER_ERROR;

        const errMessage = "💀 Failed to get post:";
        console.error(errMessage, error.message);

        return error.message;
      }
    })
    .put("/:postId", async ({ params, body, set }) => {
      try {
        const post = await postService.updatePost(params.postId, body);
        if (!post) throw new BlogPortalPostError(BlogPortalPostErrorMessage.UPDATE_FAILED, Status.INTERNAL_SERVER_ERROR);

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
          if (!post) throw new BlogPortalPostError(BlogPortalPostErrorMessage.CREATE_FAILED, Status.INTERNAL_SERVER_ERROR);

          set.status = Status.CREATED;

          return post.toJSON();
        } catch (e) {
          const error = e as BlogPortalPostError;
          set.status = error.status ?? Status.INTERNAL_SERVER_ERROR;

          const errMessage = "💀 Failed to create post:";
          console.error(errMessage, error.message);

          return error.message;
        }
      },
      {
        body: CreatePostBodyType,
      }
    );
};
