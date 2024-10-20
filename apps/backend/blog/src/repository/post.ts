import { RootFilterQuery } from "mongoose";
import { PostModel, Post } from "../model";

export const createOne = (post: Post) => {
  return PostModel.create(post);
};

export const findMany = (findOptions?: RootFilterQuery<Post>) => {
  if (findOptions) {
    return PostModel.find(findOptions);
  }
  return PostModel.find();
};
