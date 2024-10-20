import { Category, Post } from "../model";
import { PostRepository } from "../repository";

export const getPostsAfterReleaseDate = async (releaseDate: Date) => {
  const posts = await PostRepository.findMany({
    releaseDate: { $gte: releaseDate },
  });

  return posts;
};

export const getPostsByCategoryAndAfterReleaseDate = async (
  category: Category,
  releaseDate: Date
) => {
  const posts = await PostRepository.findMany({
    category,
    releaseDate: { $gte: releaseDate },
  });

  return posts;
};

export const createPost = async (post: Post) => {
  const createdPost = await PostRepository.createOne(post);

  return createdPost;
};
