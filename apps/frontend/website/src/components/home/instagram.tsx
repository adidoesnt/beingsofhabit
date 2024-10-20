import Image from "next/image";
import { Logo } from "../logo";
import config from "@/app/config.json";
import { Instagram as MobileInstagram } from "./mobile";
import { useIsMobile } from "../../utils/mobile";

const { home } = config.pages;
const { instagram } = home.components;

export type InstagramProps = {
  isMobile: boolean;
};

const VisitPageButton = () => {
  return (
    <a href={instagram.visitPageButton.href}>
      <button className="px-4 py-2 font-bold border-[1px] border-dark-brown">
        {instagram.visitPageButton.text}
      </button>
    </a>
  );
};

const Content = () => {
  return (
    <>
      <p className="text-center text-xl">{instagram.content[0]}</p>
      <p className="text-center text-xl">{instagram.content[1]}</p>
      <p className="text-center font-bold text-xl">{instagram.content[2]}</p>
    </>
  );
};

export const InstagramContent = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-12">
      <Logo />
      <Content />
      <VisitPageButton />
    </div>
  );
};

const RightPanel = () => {
  return (
    <div className="flex w-full h-full">
      <Image
        src={instagram.coverImage.src}
        alt={instagram.coverImage.alt}
        width={1000}
        height={1000}
      />
    </div>
  );
};

export const Instagram = async () => {
  const isMobile = await useIsMobile();

  if (isMobile)
    return <MobileInstagram backgroundImageSrc={instagram.coverImage.src} />;

  return (
    <div className="grid grid-cols-2 w-[100dvw] h-fit bg-dull-gray text-dark-brown">
      <InstagramContent />
      <RightPanel />
    </div>
  );
};
