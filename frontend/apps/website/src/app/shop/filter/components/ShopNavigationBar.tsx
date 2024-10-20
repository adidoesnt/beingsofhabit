"use client";

import config from "@/app/config.json";
import { Link, LinkType } from "../../../../components";
import { useCurrentPath } from "../../../../utils/path";

const { subpaths } = config.components.header.links.find(
  (link) => link.label === "shop",
) as {
  subpaths: LinkType[];
};

export const ShopNavigationBar = () => {
  const currentPath = useCurrentPath();
  const currentSubpath = currentPath.split(" ").splice(2).join("-");

  return (
    <div className="flex flex-col w-full gap-8 p-4 min-h-[100dvh] list-none text-lg bg-beige text-dark-brown text-left border-r-[1px] border-dark-brown">
      <h1 className="text-3xl self-center">shop</h1>
      {subpaths.map((subpath, index) => {
        const active = currentSubpath === subpath.href.split("/").pop();
        return (
          <>
            <Link key={index} {...subpath} active={active} />
          </>
        );
      })}
    </div>
  );
};
