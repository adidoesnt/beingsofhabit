import config from "@/app/config.json";
import Image from "next/image";

const { home } = config.pages;
const { haircare } = home.components;

const ShopNowButton = () => {
  return (
    <a href={haircare.shopNowButton.href}>
      <button className="px-4 py-2 border-[1px] border-dark-brown">
        {haircare.shopNowButton.text}
      </button>
    </a>
  );
};

const HaircareImage = () => {
  return (
    <div className="flex w-full h-full p-16">
      <Image
        src={haircare.image.src}
        alt={haircare.image.alt}
        width={1000}
        height={1000}
      />
    </div>
  );
};

export const LeftPanel = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-8 p-16 h-full">
      <p className="text-left text-4xl">{haircare.caption}</p>
      <ShopNowButton />
    </div>
  );
};

export const Haircare = () => {
  return (
    <div className="flex w-[100dvw] h-[100dvh] justify-center items-center bg-dull-gray text-dark-brown">
      <LeftPanel />
      <HaircareImage />
    </div>
  );
};
