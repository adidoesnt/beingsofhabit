import { useCallback, useMemo } from "react";
import { Button } from "../ui/button";
import { Post } from "./Columns";
import { apiClient } from "@/utils";
import { useAuth } from "@/context/auth";
import { useNavigate } from "@tanstack/react-router";
import { queryClient } from "@/routes/__root";

const defaultPost: Omit<Post, "_id" | "author"> = {
  title: "My New Post!",
  blurb: "This is my new post.",
  content: "This is my new post.",
  category: "learning",
  headerImageURL: "https://picsum.photos/300/200",
  releaseDate: new Date(),
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
