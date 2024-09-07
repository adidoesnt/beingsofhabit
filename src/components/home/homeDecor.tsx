import config from "@/app/config.json";
import Image from "next/image";

const { home } = config.pages;
const { homeDecor } = home.components;

export const ShopNowButton = () => {
  return (
    <div className="flex w-1/2 justify-end items-center self-end p-16 pt-0">
      <a href={homeDecor.shopNowButton.href}>
        <button className="px-4 py-2 border-[1px] border-dark-brown">
          {homeDecor.shopNowButton.text}
        </button>
      </a>
    </div>
  );
};

const HomeDecorCaption = () => {
  return (
    <div className="flex flex-col gap-4 w-full p-16 pb-0">
      <hr className="border-dark-brown border-b-[1px] w-1/4" />
      <p className="text-left text-4xl">{homeDecor.caption}</p>
    </div>
  );
};

const Images = () => {
  return (
    <div className="flex w-full h-full justify-center items-center gap-4 p-8">
      {homeDecor.images.map((image) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={750}
          height={750}
          className="overflow-hidden"
        />
      ))}
    </div>
  );
};

export const HomeDecor = () => {
  return (
    <div className="flex flex-col w-[100dvw] h-fit justify-center items-center bg-beige text-black p-8 gap-2">
      <HomeDecorCaption />
      <ShopNowButton />
      <Images />
    </div>
  );
};
