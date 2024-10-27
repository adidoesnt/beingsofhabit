import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import { apiClient } from "@/utils";
import { queryClient } from "@/routes/__root";

enum DeletePostButtonState {
  DEFAULT = "Delete",
  RESTORE = "Restore",
  CONFIRM = "Are you sure?",
  DELETING = "Deleting...",
}

type DeletePostButtonProps = {
  postId: string;
  isDeleted?: boolean;
};

export const DeletePostButton = ({
  postId,
  isDeleted,
}: DeletePostButtonProps) => {
  const defaultState = isDeleted
    ? DeletePostButtonState.RESTORE
    : DeletePostButtonState.DEFAULT;
  const buttonStyle = isDeleted
    ? "bg-green-800 text-white"
    : "bg-red-800 text-white";

  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [content, setContent] = useState<DeletePostButtonState>(defaultState);

  const deletePost = useCallback(async () => {
    try {
      const { data } = await apiClient.delete(`/posts/${postId}`);
      if (!data) throw new Error("No data returned");
      setContent(defaultState);
      setIsConfirmed(false);
      navigate({
        to: "/posts",
      });
    } catch (error) {
      console.error("Failed to delete post", error);
      setContent(defaultState);
      setIsConfirmed(false);
    }
  }, [postId, setContent, setIsConfirmed, navigate]);

  const restorePost = useCallback(async () => {
    try {
      const { data } = await apiClient.put(`/posts/${postId}`, {
        isDeleted: false,
      });
      if (!data) throw new Error("No data returned");
      setContent(defaultState);
      setIsConfirmed(false);
      navigate({
        to: "/posts",
      });
    } catch (error) {
      console.error("Failed to restore post", error);
      setContent(defaultState);
      setIsConfirmed(false);
    }
  }, [postId, setContent, setIsConfirmed, navigate]);

  const handleClick = useCallback(async () => {
    if (isConfirmed) {
      isDeleted ? await restorePost() : await deletePost();
      await queryClient.invalidateQueries({
        queryKey: ["post", postId],
      });
      return;
    }
    setIsConfirmed(true);
    setContent(DeletePostButtonState.CONFIRM);
  }, [
    isConfirmed,
    deletePost,
    restorePost,
    setIsConfirmed,
    setContent,
    postId,
  ]);

  return (
    <Button type="button" onClick={handleClick} className={buttonStyle}>
      {content}
    </Button>
  );
};
