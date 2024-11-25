import { useAuth } from "@/context/auth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiClient } from "@/utils";
import { Button } from "../ui/button";
import { ErrorModal } from "../ui/errorModal";

export const SessionExpiryAlert = () => {
  const {
    showSessionExpiryPopup,
    setSessionExpiryWithMaxAge,
    setUser,
    setShowSessionExpiryPopup,
  } = useAuth();
  const [refreshFailed, setRefreshFailed] = useState(false);
  const [title, setTitle] = useState("Session Expired");
  const [description, setDescription] = useState(
    "Your session has expired. Please refresh to continue.",
  );

  useEffect(() => {
    if (refreshFailed) {
      setTitle("Session Refresh Failed");
      setDescription("Your session refresh failed. Please log out.");
    }
  }, [refreshFailed, setTitle, setDescription]);

  const refreshSession = useCallback(async () => {
    try {
      const { data } = await apiClient.get("/users/refresh");
      const { maxAge } = data;
      if (!maxAge) throw new Error("No maxAge returned");
      setSessionExpiryWithMaxAge(maxAge);
    } catch (error) {
      console.error("Failed to refresh session", error);
      setRefreshFailed(true);
    }
  }, [setSessionExpiryWithMaxAge, setRefreshFailed]);

  const logout = useCallback(async () => {
    try {
      const { data } = await apiClient.post("/users/logout");
      if (!data) throw new Error("No data returned");
      setUser(null);
      setShowSessionExpiryPopup(false);
    } catch (error) {
      console.error("Failed to logout", error);
    }
  }, [setUser, setShowSessionExpiryPopup]);

  const buttons = useMemo(() => {
    return (
      <>
        {!refreshFailed && (
          <Button className="w-fit" onClick={refreshSession}>
            Refresh
          </Button>
        )}
        <Button className="w-fit bg-red-600 text-white" onClick={logout}>
          Logout
        </Button>
      </>
    );
  }, [refreshFailed, refreshSession, logout]);

  if (!showSessionExpiryPopup) return null;

  return (
    <ErrorModal title={title} description={description}>
      {buttons}
    </ErrorModal>
  );
};
