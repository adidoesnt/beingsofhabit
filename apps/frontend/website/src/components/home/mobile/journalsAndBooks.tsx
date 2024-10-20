import { JournalsAndBooksContent, ShopNowButton as JournalsAndBooksShopNowButton } from "../journalsAndBooks";

export type MobileJournalsAndBooksProps = {
  backgroundImageSrc: string;
};

export const JournalsAndBooks = ({ backgroundImageSrc }: Readonly<MobileJournalsAndBooksProps>) => {
  return (
    <div
      className="flex w-[100dvw] h-[100dvh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImageSrc})`,
      }}
    >
      <div className="flex flex-col gap-16 justify-center items-center bg-olive text-beige bg-opacity-75 w-full">
        <JournalsAndBooksContent />
        <JournalsAndBooksShopNowButton />
      </div>
    </div>
  );
};
