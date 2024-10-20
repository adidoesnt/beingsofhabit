import config from "@/app/config.json";
import { useIsMobile } from "../../utils/mobile";

const { home } = config.pages;
const { homeDecor } = home.components;

export const ShopNowButton = async () => {
  const isMobile = await useIsMobile();

  const containerStyles = isMobile
    ? "flex flex-col w-full h-1/2 items-end justify-center self-center p-4 pt-0 gap-6"
    : "flex w-1/2 justify-end items-center self-end p-16 pt-0";

  return (
    <div className={containerStyles}>
      <a href={homeDecor.shopNowButton.href}>
        <button className="px-4 py-2 border-[1px] border-dark-brown">
          {homeDecor.shopNowButton.text}
        </button>
      </a>
      {isMobile && <hr className="border-dark-brown border-b-[1px] w-1/4" />}
    </div>
  );
};

const HomeDecorCaption = async () => {
  const isMobile = await useIsMobile();

  const containerStyles = isMobile
    ? "flex flex-col gap-4 p-4 pt-16 pb-0"
    : "flex flex-col gap-4 w-1/2 p-16 pb-0";

  return (
    <div className={containerStyles}>
      <hr className="border-dark-brown border-b-[1px] w-1/4" />
      <p className="text-left text-4xl">{homeDecor.caption}</p>
      {isMobile && <hr className="border-dark-brown border-b-[1px] w-full" />}
    </div>
  );
};

export const Images = async () => {
  const isMobile = await useIsMobile();

  const containerStyles = isMobile
    ? "flex w-full h-full justify-start items-center self-start gap-4 p-8 overflow-x-auto"
    : "flex w-full h-full justify-center items-center gap-4 p-8";

  const imageStyles = isMobile
    ? "w-auto object-scale-down"
    : "h-[300px] w-auto object-scale-down";

  return (
    <div className={containerStyles}>
      {homeDecor.images.map((image) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          className={imageStyles}
        />
      ))}
    </div>
  );
};

export const HomeDecor = async () => {
  const isMobile = await useIsMobile();

  const containerStyles = isMobile
    ? "flex flex-col h-[100dvh] bg-beige text-black p-8 gap-2"
    : "flex flex-col w-[100dvw] h-fit justify-center items-start bg-beige text-black p-8 gap-2";

  return (
    <div className={containerStyles}>
      <HomeDecorCaption />
      <ShopNowButton />
      <Images />
    </div>
  );
};
