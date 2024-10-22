import { RootFilterQuery } from "mongoose";
import { PostModel, Post } from "../model";

export const createOne = async (post: Post) => {
  try {
    return await PostModel.create(post);
  } catch (error) {
    console.error("Failed to create post", error);
  }
};

export const findMany = async (findOptions?: RootFilterQuery<Post>) => {
  try {
    if (findOptions) {
      return await PostModel.find(findOptions);
    }
    return await PostModel.find();
  } catch (error) {
    console.error("Failed to find posts", error);
  }
};
