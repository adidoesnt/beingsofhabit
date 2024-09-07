import config from "@/app/config.json";
import Image from "next/image";

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

const LeftPanel = () => {
  return (
    <div className="flex flex-col p-16 gap-8">
      <p className="text-left text-4xl">{activeWearAndAccessories.caption}</p>
      <ShopNowButton />
    </div>
  );
};

const RightPanel = () => {
  return (
    <div className="flex w-full h-full">
      <Image
        src={activeWearAndAccessories.image.src}
        alt={activeWearAndAccessories.image.alt}
        width={1000}
        height={1000}
      />
    </div>
  );
};

export const ActiveWearAndAccessories = () => {
  return (
    <div className="grid grid-cols-2 w-[100dvw] h-fit bg-olive text-dull-gray">
      <LeftPanel />
      <RightPanel />
    </div>
  );
};
