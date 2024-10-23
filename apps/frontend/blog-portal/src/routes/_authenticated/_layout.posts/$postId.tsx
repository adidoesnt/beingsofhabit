import { Editor } from "@/components/postEditor/Editor";
import { Post } from "@/packages/types/post";
import { apiClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";

export const Route = createFileRoute("/_authenticated/_layout/posts/$postId")({
  component: EditPostPage,
});

function EditPostPage() {
  const { postId } = Route.useParams();

  const fetchPost = useCallback(async () => {
    try {
      const { data: post } = await apiClient.get(`/posts/${postId}`);
      if (!post) throw new Error("No post returned");
      return post;
    } catch (error) {
      console.error("Failed to fetch post", error);
    }
  }, [postId]);

  const { isPending, error, data } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: fetchPost,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <Editor post={data} />;
}
