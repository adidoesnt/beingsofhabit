import { RootFilterQuery } from "mongoose";
import { PostModel } from "../model";
import { Post } from "@/packages/types/post";
import { logger } from "src/utils";

export const createOne = async (post: Post) => {
  try {
    return await PostModel.create(post);
  } catch (error) {
    logger.error("Failed to create post", error as Error);
  }
};

export const findOne = async (findOptions?: RootFilterQuery<Post>) => {
  try {
    if (findOptions) {
      return await PostModel.findOne(findOptions);
    }
    return await PostModel.findOne();
  } catch (error) {
    logger.error("Failed to find post", error as Error);
  }
};

export const findMany = async (findOptions?: RootFilterQuery<Post>) => {
  try {
    logger.debug("Post repository::Find posts", findOptions);
    if (findOptions) {
      return await PostModel.find(findOptions);
    }
    return await PostModel.find();
  } catch (error) {
    logger.error("Failed to find posts", error as Error);
  }
};

export const updateOneById = async (id: string, post: Partial<Post>) => {
  try {
    logger.debug("Post repository::Update post", id, post);
    const updateResult = await PostModel.updateOne({ _id: id }, post);
    if (updateResult.modifiedCount < 1) throw new Error("No post updated");
    return await findOne({ _id: id });
  } catch (error) {
    logger.error("Failed to update post", error as Error);
  }
};

export const deleteOneById = async (id: string) => {
  logger.debug("Post repository::Delete post", id);
  try {
    const deleteResult = await PostModel.updateOne(
      { _id: id },
      { isDeleted: true },
    );
    if (deleteResult.modifiedCount < 1) throw new Error("No post deleted");
    const deletedPost = await findOne({ _id: id });
    if (!deletedPost?.isDeleted) throw new Error("Post not deleted");
  } catch (error) {
    logger.error("Failed to delete post", error as Error);
  }
};
