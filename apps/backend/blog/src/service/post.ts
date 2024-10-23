import { Category, Post } from "@/packages/types/post";
import { postRepository } from "../repository";

export const getPosts = async (releaseDate?: Date, category?: Category) => {
  const options: Record<string, unknown> = releaseDate ? {
    releaseDate: { $lte: releaseDate },
  } : {};
  if (category) options.category = category;

  const posts = await postRepository.findMany(options);

  return posts;
};

export const findById = async (postId: string) => {
  const post = await postRepository.findOne({ _id: postId });

  return post;
};

export const createPost = async (post: Post) => {
  const createdPost = await postRepository.createOne(post);

  return createdPost;
};

export const updatePost = async (postId: string, post: Partial<Post>) => {
  const updatedPost = await postRepository.updateOneById(postId, post);

  return updatedPost;
};
