/* eslint-disable @next/next/no-img-element */
import config from "@/app/config.json";

const { home } = config.pages;
const { supplements } = home.components;

export const ShopNowButton = () => {
  return (
    <div className="flex w-1/2 justify-end items-center self-end p-16 pt-0">
      <a href={supplements.shopNowButton.href}>
        <button className="px-4 py-2 border-[1px] border-dark-brown">
          {supplements.shopNowButton.text}
        </button>
      </a>
    </div>
  );
};

const SupplementsCaption = () => {
  return (
    <div className="flex flex-col gap-4 w-1/2 p-16 pb-0">
      <hr className="border-dark-brown border-b-[1px] w-1/2" />
      <p className="text-left text-4xl">{supplements.caption}</p>
    </div>
  );
};

const Images = () => {
  return (
    <div className="flex w-full h-full justify-center items-center gap-4 p-8">
      {supplements.images.map((image) => (
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={500}
          height={500}
          className="overflow-hidden"
        />
      ))}
    </div>
  );
};

export const Supplements = () => {
  return (
    <div className="flex flex-col w-[100dvw] h-fit justify-center items-start bg-dull-gray text-dark-brown">
      <SupplementsCaption />
      <ShopNowButton />
      <Images />
    </div>
  );
};
