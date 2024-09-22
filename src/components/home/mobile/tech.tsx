import { RightPanel as TechContent } from "../tech";

export type MobileTechProps = {
  backgroundImageSrc: string;
};

export const Tech = ({ backgroundImageSrc }: Readonly<MobileTechProps>) => {
  return (
    <div
      className="flex w-[100dvw] h-[100dvh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImageSrc})`,
      }}
    >
      <div className="flex flex-col gap-16 justify-center items-center bg-olive text-beige bg-opacity-75 w-full">
        <TechContent />
      </div>
    </div>
  );
};
