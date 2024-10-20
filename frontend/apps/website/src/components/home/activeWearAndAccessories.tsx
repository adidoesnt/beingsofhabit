/* eslint-disable @next/next/no-img-element */
import config from "@/app/config.json";
import { useIsMobile } from "../../utils/mobile";
import { ActiveWearAndAccessories as MobileActiveWearAndAccessories } from "./mobile";

const { home } = config.pages;
const { activeWearAndAccessories } = home.components;

const ShopNowButton = () => {
  return (
    <a href={activeWearAndAccessories.shopNowButton.href}>
      <button className="px-4 py-2 border-[1px] border-dull-gray">
        {activeWearAndAccessories.shopNowButton.text}
      </button>
    </a>
  );
};

export const LeftPanel = async () => {
  const isMobile = await useIsMobile();

  const textStyles = isMobile ? "text-center text-4xl" : "text-left text-4xl";

  const containerStyles = isMobile
    ? "flex flex-col p-16 gap-8 items-center"
    : "flex flex-col p-16 gap-8";

  return (
    <div className={containerStyles}>
      <p className={textStyles}>{activeWearAndAccessories.caption}</p>
      <ShopNowButton />
    </div>
  );
};

const RightPanel = () => {
  return (
    <div className="flex w-full h-full">
      <img
        src={activeWearAndAccessories.image.src}
        alt={activeWearAndAccessories.image.alt}
        width={1000}
        height={1000}
      />
    </div>
  );
};

export const ActiveWearAndAccessories = async () => {
  const isMobile = await useIsMobile();

  if (isMobile)
    return (
      <MobileActiveWearAndAccessories
        backgroundImageSrc={activeWearAndAccessories.image.src}
      />
    );

  return (
    <div className="grid grid-cols-2 w-[100dvw] h-fit bg-olive text-dull-gray">
      <LeftPanel />
      <RightPanel />
    </div>
  );
};
