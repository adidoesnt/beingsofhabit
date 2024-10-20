import { InstagramContent } from "../instagram";

export type MobileInstagramProps = {
  backgroundImageSrc: string;
};

export const Instagram = ({
  backgroundImageSrc,
}: Readonly<MobileInstagramProps>) => {
  return (
    <div
      className="flex w-[100dvw] h-fit bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImageSrc})`,
      }}
    >
      <div className="flex justify-center items-start bg-beige text-olive bg-opacity-75">
        <InstagramContent />
      </div>
    </div>
  );
};
