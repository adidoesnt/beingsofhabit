import { useCallback, useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { Category, Post } from "@/packages/types/post";
import { apiClient } from "@/utils";
import { useAuth } from "@/context/auth";
import { useNavigate } from "@tanstack/react-router";
import { queryClient } from "@/routes/__root";

const DEFAULT_HEADER_IMAGE_URL = "https://picsum.photos/300/200";

const getDefaultReleaseDate = () => {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  now.setHours(0, 0, 0, 0);
  const defaultReleaseDate = new Date(now);
  return defaultReleaseDate;
};

const defaultPost: Omit<Post, "_id" | "author"> = {
  title: "My New Post!",
  blurb: "This is my new post.",
  content: "This is my new post.",
  category: Category.MISC,
  headerImageURL: DEFAULT_HEADER_IMAGE_URL,
  releaseDate: getDefaultReleaseDate(),
};

export const PostListHeader = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const author = useMemo(() => user?.username, [user]);

  const handleCreatePost = useCallback(async () => {
    try {
      if (!author) throw new Error("No author");
      const { data: post } = await apiClient.post("/posts", {
        ...defaultPost,
        author,
      });
      if (!post) throw new Error("No post returned");
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      navigate({
        to: `/posts/${post._id}`,
      });
    } catch (error) {
      console.error("Failed to create post", error);
    }
  }, [user]);

  return (
    <div className="flex w-full justify-between p-4">
      <h1 className="text-center text-2xl font-bold">Blog Posts</h1>
      <Button onClick={handleCreatePost}>Create New</Button>
    </div>
  );
};
