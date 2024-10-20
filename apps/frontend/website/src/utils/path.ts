import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useCurrentPath = () => {
  const currentPath = usePathname();
  const currentSubpath = useMemo(() => {
    const path = currentPath
      .split("/")
      .filter(Boolean)
      .join(" ")
      .replace(/-/g, " ");
    return path.trim() === "" ? "home" : path;
  }, [currentPath]);

  return currentSubpath;
};
