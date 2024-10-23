import { useCallback, useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { Category, Post } from "@/packages/types/post";
import { apiClient } from "@/utils";
import { useAuth } from "@/context/auth";
import { useNavigate } from "@tanstack/react-router";
import { queryClient } from "@/routes/__root";

const defaultPost: Omit<Post, "_id" | "author"> = {
  title: "My New Post!",
  blurb: "This is my new post.",
  content: "This is my new post.",
  category: Category.MISC,
  headerImageURL: "https://picsum.photos/300/200",
  releaseDate: new Date(),
};

export const PostListHeader = () => {
  const { user, setUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const author = useMemo(() => user?.username, [user]);

  // TODO: Move to navigation accordion/navigation bar
  const handleLogout = useCallback(async () => {
    try {
      const { data } = await apiClient.post("/users/logout");
      if (!data) throw new Error("No data returned");
      setUser(null);
    } catch (error) {
      console.error("Failed to logout", error);
    }
  }, []);

  // TODO: Move to navigation accordion/navigation bar
  useEffect(() => {
    if (isAuthenticated) return;
    navigate({
      to: "/",
    });
  }, [isAuthenticated, navigate]);

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
      <Button className="text-black bg-gray-300" onClick={handleLogout}>Logout</Button>
      <h1 className="text-center text-2xl font-bold">Blog Posts</h1>
      <Button onClick={handleCreatePost}>Create New</Button>
    </div>
  );
};
