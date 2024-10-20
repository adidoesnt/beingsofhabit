/* eslint-disable @next/next/no-img-element */
import config from "@/app/config.json";
import { useIsMobile } from "../../utils/mobile";
import { Supplements as MobileSupplements } from "./mobile";

const { home } = config.pages;
const { supplements } = home.components;

export const ShopNowButton = async () => {
  const isMobile = await useIsMobile();

  const containerStyles = isMobile
    ? "flex justify-end items-center self-center p-16 pt-0"
    : "flex flex-col items-center justify-start p-16 h-full";

  const buttonStyles = isMobile
    ? "px-4 py-2 border-[1px] border-beige"
    : "px-4 py-2 border-[1px] border-dark-brown";

  return (
    <div className={containerStyles}>
      <a href={supplements.shopNowButton.href}>
        <button className={buttonStyles}>
          {supplements.shopNowButton.text}
        </button>
      </a>
    </div>
  );
};

export const SupplementsCaption = async () => {
  const isMobile = await useIsMobile();

  const containerStyles = isMobile
    ? "flex flex-col gap-4 p-4 pb-0"
    : "flex flex-col gap-4 w-1/2 p-16 pb-0";

  const textStyles = isMobile ? "text-center text-4xl" : "text-left text-4xl";

  return (
    <div className={containerStyles}>
      {!isMobile && <hr className="border-dark-brown border-b-[1px] w-1/2" />}
      <p className={textStyles}>{supplements.caption}</p>
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

export const Supplements = async () => {
  const isMobile = await useIsMobile();

  if (isMobile)
    return <MobileSupplements backgroundImageSrc={supplements.images[1].src} />;

  return (
    <div className="flex flex-col w-[100dvw] h-fit justify-center items-start bg-dull-gray text-dark-brown">
      <SupplementsCaption />
      <ShopNowButton />
      <Images />
    </div>
  );
};
