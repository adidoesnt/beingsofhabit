import config from "@/app/config.json";
import { Link, LinkType } from "../../../components";
import { useIsMobile } from "../../../utils/mobile";

const { subpaths } = config.components.header.links.find(
  (link) => link.label === "shop",
) as {
  subpaths: LinkType[];
};

export const NavigationBar = async () => {
  const isMobile = await useIsMobile();
  const containerStyles = isMobile
    ? "grid grid-flow-row w-full h-fit justify-center items-center gap-1 p-4 list-none text-lg text-center"
    : "grid grid-flow-col w-full h-fit justify-center items-center gap-4 p-4 list-none text-lg";

  return (
    <div className={containerStyles}>
      {subpaths.map((subpath, index) => {
        return (
          <>
            {index > 0 && !isMobile && <span className="mx-2">|</span>}
            <Link key={index} {...subpath} />
          </>
        );
      })}
    </div>
  );
};
