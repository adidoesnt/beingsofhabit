import config from "@/app/config.json";
import Image from "next/image";
import { JournalsAndBooks as MobileJournalsAndBooks } from "./mobile";
import { useIsMobile } from "../../utils/mobile";

const { home } = config.pages;
const { journalsAndBooks } = home.components;

export const ShopNowButton = () => {
  return (
    <a href={journalsAndBooks.shopNowButton.href}>
      <button className="px-4 py-2 border-[1px] border-dull-gray">
        {journalsAndBooks.shopNowButton.text}
      </button>
    </a>
  );
};

export const JournalsAndBooksContent = async () => {
  const isMobile = await useIsMobile();
  const styles = isMobile
    ? "flex flex-col gap-2 items-center justify-center"
    : "flex flex-col gap-2 items-start justify-center";

  return (
    <div className={styles}>
      {journalsAndBooks.content.map((content) => (
        <p key={content} className="text-center text-4xl">
          {content}
        </p>
      ))}
    </div>
  );
};

const LeftPanel = () => {
  return (
    <div className="flex flex-col justify-start items-start p-12 gap-12">
      <JournalsAndBooksContent />
      <ShopNowButton />
    </div>
  );
};

const RightPanel = () => {
  return (
    <div className="flex w-full h-full">
      <Image
        src={journalsAndBooks.image.src}
        alt={journalsAndBooks.image.alt}
        width={1000}
        height={1000}
      />
    </div>
  );
};

export const JournalsAndBooks = async () => {
  const isMobile = await useIsMobile();

  if (isMobile)
    return (
      <MobileJournalsAndBooks backgroundImageSrc={journalsAndBooks.image.src} />
    );

  return (
    <div className="grid grid-cols-2 justify-center items-center bg-olive text-dull-gray">
      <LeftPanel />
      <RightPanel />
    </div>
  );
};
