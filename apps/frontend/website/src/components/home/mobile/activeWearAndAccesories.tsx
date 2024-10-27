import { LeftPanel as ActiveWearAndAccessoriesContent } from "../activeWearAndAccessories";

export type MobileActiveWearAndAccessoriesProps = {
  backgroundImageSrc: string;
};

export const ActiveWearAndAccessories = ({
  backgroundImageSrc,
}: Readonly<MobileActiveWearAndAccessoriesProps>) => {
  return (
    <div
      className="flex w-[100dvw] h-[100dvh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImageSrc})`,
      }}
    >
      <div className="flex flex-col gap-16 justify-center items-center bg-olive text-beige bg-opacity-75 w-full">
        <ActiveWearAndAccessoriesContent />
      </div>
    </div>
  );
};
