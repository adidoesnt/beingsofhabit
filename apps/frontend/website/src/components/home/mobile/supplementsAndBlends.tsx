import { SupplementsCaption, ShopNowButton as SupplementsShopNowButton } from "../supplements";

export type MobileSupplementsProps = {
  backgroundImageSrc: string;
};

export const Supplements = ({ backgroundImageSrc }: Readonly<MobileSupplementsProps>) => {
  return (
    <div
      className="flex w-[100dvw] h-[100dvh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImageSrc})`,
      }}
    >
      <div className="flex flex-col gap-16 justify-center items-center bg-olive text-beige bg-opacity-75 w-full">
        <SupplementsCaption />
        <SupplementsShopNowButton />
      </div>
    </div>
  );
};
