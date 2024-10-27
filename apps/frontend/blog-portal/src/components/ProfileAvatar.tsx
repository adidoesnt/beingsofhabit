import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";
import { getInitials } from "@/packages/utils/string";
import { useCallback, useEffect } from "react";
import { apiClient } from "@/utils";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";

export const ProfileAvatar = ({ className }: { className?: string }) => {
  const { user, setUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      const { data } = await apiClient.post("/users/logout");
      if (!data) throw new Error("No data returned");
      setUser(null);
    } catch (error) {
      console.error("Failed to logout", error);
    }
  }, [setUser]);

  useEffect(() => {
    if (isAuthenticated) return;
    navigate({
      to: "/",
    });
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  return (
    <div className={className}>
      <HoverCard>
        <HoverCardTrigger>
          <Avatar>
            <AvatarFallback className="bg-white text-black border-gray-500 border-2 border-solid">
              {getInitials(user.username)}
            </AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent className="bg-white text-black border-gray-500 p-4 rounded-md shadow-lg m-2 flex flex-col w-fit gap-2 items-center">
          <p>
            Logged in as <span className="text-blue-700">@{user.username}</span>
          </p>
          <Button className="w-fit" onClick={logout}>
            Logout
          </Button>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
