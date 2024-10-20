/* eslint-disable @next/next/no-img-element */
import config from "@/app/config.json";
import { useIsMobile } from "../../utils/mobile";
import { Essentials as MobileEssentials } from "./mobile";

const { home } = config.pages;
const { shop } = home.components;

export const ShopNowButton = () => {
  return (
    <a href={shop.shopNowButton.href}>
      <button className="px-4 py-2 border-[1px] border-dark-brown">
        {shop.shopNowButton.text}
      </button>
    </a>
  );
};

const EssentialsCaption = () => {
  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex flex-col w-full">
        <hr className="border-dark-brown border-b-[1px] w-full" />
        <h1 className="text-center text-xl p-4">{shop.title}</h1>
      </div>
      <ShopNowButton />
    </div>
  );
};

export const EssentialsImages = () => {
  return (
    <>
      {shop.images.map((image) => (
        <img key={image.src} src={image.src} className="w-auto h-[300px]" />
      ))}
    </>
  );
};

export const Essentials = async () => {
  const isMobile = await useIsMobile();

  if (isMobile) return <MobileEssentials />;

  return (
    <div className="flex w-[100dvw] h-fit justify-center items-center bg-beige text-black overflow-clip">
      <div className="flex gap-4 overflow-x-auto p-16">
        <EssentialsCaption />
        <EssentialsImages />
      </div>
    </div>
  );
};
