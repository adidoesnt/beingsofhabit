import config from "@/app/config.json";
import { useIsMobile } from "../../utils/mobile";
import Image from "next/image";
import { Tech as MobileTech } from "./mobile";

const { home } = config.pages;
const { tech } = home.components;

const ShopNowButton = () => {
  return (
    <a href={tech.shopNowButton.href}>
      <button className="px-4 py-2 border-[1px] border-dark-brown">
        {tech.shopNowButton.text}
      </button>
    </a>
  );
};

const TechImage = () => {
  return (
    <div className="flex w-full h-full">
      <Image
        src={tech.image.src}
        alt={tech.image.alt}
        width={1000}
        height={1000}
      />
    </div>
  );
};

export const RightPanel = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-16 h-full">
      <p className="text-right text-4xl">{tech.caption}</p>
      <ShopNowButton />
    </div>
  );
};

export const Tech = async () => {
  const isMobile = await useIsMobile();

  if (isMobile) return <MobileTech backgroundImageSrc={tech.image.src} />;

  return (
    <div className="grid grid-cols-2 w-[100dvw] h-fit justify-center items-center bg-dull-gray text-dark-brown">
      <TechImage />
      <RightPanel />
    </div>
  );
};
