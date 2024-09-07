import config from "@/app/config.json";
import Image from "next/image";

const { home } = config.pages;
const { skincare } = home.components;

const ShopNowButton = () => {
  return (
    <a href={skincare.shopNowButton.href}>
      <button className="px-4 py-2 border-[1px] border-dark-brown">
        {skincare.shopNowButton.text}
      </button>
    </a>
  );
};

const SkincareImage = () => {
  return (
    <div className="flex w-full h-full p-16">
      <Image
        src={skincare.image.src}
        alt={skincare.image.alt}
        width={1000}
        height={1000}
      />
    </div>
  );
};

export const RightPanel = () => {
  return (
    <div className="flex flex-col items-end justify-start gap-8 p-16 h-full">
      <p className="text-right text-4xl">{skincare.caption}</p>
      <ShopNowButton />
    </div>
  );
};

export const Skincare = () => {
  return (
    <div className="flex w-[100dvw] h-[100dvh] justify-center items-center bg-beige text-black">
      <SkincareImage />
      <RightPanel />
    </div>
  );
};
