import { Category, Post } from "@/packages/types/post";
import { postRepository } from "../repository";
import { logger } from "src/utils";

export const getPosts = async (
  releaseDate?: string,
  category?: Category,
  includeDeleted?: string,
) => {
  const options: Record<string, unknown> = releaseDate
    ? {
        releaseDate: { $lte: new Date(releaseDate) }, // NOTE: workaround due to broken ElysiaJS Query Param Validation
      }
    : {};
  if (category) options.category = category;
  if (includeDeleted !== "true") options.isDeleted = { $ne: true }; // NOTE: workaround due to broken ElysiaJS Query Param Validation
  logger.debug("Post service::Get posts", options);

  const posts = await postRepository.findMany(options);

  return posts;
};

export const findById = async (postId: string) => {
  logger.debug("Post service::Find post by id", postId);

  const post = await postRepository.findOne({ _id: postId });

  return post;
};

export const createPost = async (post: Post) => {
  logger.debug("Post service::Create post", post);

  const createdPost = await postRepository.createOne(post);

  return createdPost;
};

export const updatePost = async (postId: string, post: Partial<Post>) => {
  logger.debug("Post service::Update post", postId, post);

  const updatedPost = await postRepository.updateOneById(postId, post);

  return updatedPost;
};

export const deletePost = async (postId: string) => {
  logger.debug("Post service::Delete post", postId);

  const deletedPost = await postRepository.deleteOneById(postId);

  return deletedPost;
};
