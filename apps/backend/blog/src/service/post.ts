import { Category, Post } from "@/packages/types/post";
import { postRepository } from "../repository";

export const getPosts = async (
    releaseDate?: string,
    category?: Category,
    includeDeleted?: string
) => {
    const options: Record<string, unknown> = releaseDate
        ? {
              releaseDate: { $lte: new Date(releaseDate) }, // NOTE: workaround due to broken ElysiaJS Query Param Validation
          }
        : {};
    if (category) options.category = category;
    if (includeDeleted !== "true") options.isDeleted = { $ne: true }; // NOTE: workaround due to broken ElysiaJS Query Param Validation

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

export const deletePost = async (postId: string) => {
    const deletedPost = await postRepository.deleteOneById(postId);

    return deletedPost;
};
