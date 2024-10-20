import { Category, Post } from "../model";
import { PostRepository } from "../repository";

export const getPosts = async (releaseDate: Date, category?: Category) => {
  const options: Record<string, unknown> = {
    releaseDate: { $gte: releaseDate },
  };
  if (category) options.category = category;

  const posts = await PostRepository.findMany(options);

  return posts;
};

export const createPost = async (post: Post) => {
  const createdPost = await PostRepository.createOne(post);

  return createdPost;
};
