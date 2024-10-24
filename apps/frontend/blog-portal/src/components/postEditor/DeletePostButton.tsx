import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import { apiClient } from "@/utils";

enum DeletePostButtonState {
    DEFAULT = "Delete",
    CONFIRM = "Are you sure?",
    DELETING = "Deleting...",
}

export const DeletePostButton = ({ postId }: { postId: string }) => {
    const navigate = useNavigate();
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [content, setContent] = useState<DeletePostButtonState>(
        DeletePostButtonState.DEFAULT
    );

    const deletePost = useCallback(async () => {
        try {
            const { data } = await apiClient.delete(`/posts/${postId}`);
            if (!data) throw new Error("No data returned");
            setContent(DeletePostButtonState.DEFAULT);
            setIsConfirmed(false);
            navigate({
                to: "/posts",
            });
        } catch (error) {
            console.error("Failed to delete post", error);
            setContent(DeletePostButtonState.DEFAULT);
            setIsConfirmed(false);
        }
    }, [postId, setContent, setIsConfirmed, navigate]);

    const handleClick = useCallback(() => {
        if (isConfirmed) {
            deletePost();
            return;
        }
        setIsConfirmed(true);
        setContent(DeletePostButtonState.CONFIRM);
    }, [isConfirmed, deletePost, setIsConfirmed, setContent]);

    return (
        <Button
            type="button"
            onClick={handleClick}
            className="bg-red-800 text-white"
        >
            {content}
        </Button>
    );
};
