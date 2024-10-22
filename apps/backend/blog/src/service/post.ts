import { Category, Post } from "../model";
import { postRepository } from "../repository";

export const getPosts = async (releaseDate: Date, category?: Category) => {
  const options: Record<string, unknown> = {
    releaseDate: { $lte: releaseDate },
  };
  if (category) options.category = category;

  const posts = await postRepository.findMany(options);

  return posts;
};

export const createPost = async (post: Post) => {
  const createdPost = await postRepository.createOne(post);

  return createdPost;
};
