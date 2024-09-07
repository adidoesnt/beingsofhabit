import config from "@/app/config.json";
import Image from "next/image";

const { home } = config.pages;
const { shop } = home.components;

const ShopNowButton = () => {
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
    <div className="flex flex-col min-h-fit justify-between items-center">
      <div className="flex flex-col w-full">
        <hr className="border-dark-brown border-b-[1px] w-full" />
        <h1 className="text-center text-xl p-4">{shop.title}</h1>
      </div>
      <ShopNowButton />
    </div>
  );
};

const EssentialsImages = () => {
  return (
    <>
      {shop.images.map((image) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={300}
          height={300}
        />
      ))}
    </>
  );
};

export const Essentials = () => {
  return (
    <div className="flex w-[100dvw] h-fit justify-center items-center bg-beige text-black">
      <div className="flex gap-4 p-16">
        <EssentialsCaption />
        <EssentialsImages />
      </div>
    </div>
  );
};
