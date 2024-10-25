import { RootFilterQuery } from "mongoose";
import { PostModel } from "../model";
import { Post } from "@/packages/types/post";

export const createOne = async (post: Post) => {
  try {
    return await PostModel.create(post);
  } catch (error) {
    console.error("Failed to create post", error);
  }
};

export const findOne = async (findOptions?: RootFilterQuery<Post>) => {
  try {
    if (findOptions) {
      return await PostModel.findOne(findOptions);
    }
    return await PostModel.findOne();
  } catch (error) {
    console.error("Failed to find post", error);
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

export const updateOneById = async (id: string, post: Partial<Post>) => {
  try {
    const updateResult = await PostModel.updateOne({ _id: id }, post);
    if (updateResult.modifiedCount < 1) throw new Error("No post updated");
    return await findOne({ _id: id });
  } catch (error) {
    console.error("Failed to update post", error);
  }
};

export const deleteOneById = async (id: string) => {
  try {
    const deleteResult = await PostModel.updateOne({ _id: id }, { isDeleted: true });
    if (deleteResult.modifiedCount < 1) throw new Error("No post deleted");
    const deletedPost = await findOne({ _id: id });
    if (!deletedPost?.isDeleted) throw new Error("Post not deleted");
  } catch (error) {
    console.error("Failed to delete post", error);
  }
};
