"use client";

import { useCurrentPath } from "../../../../utils/path";
import { useMemo } from "react";

export const Title = () => {
  const currentPath = useCurrentPath();
  const title = useMemo(
    () => currentPath.split(" ").splice(2).join(" "),
    [currentPath],
  );

  return <h1 className="text-3xl">{title}</h1>;
};
