import Image from "next/image";
import config from "@/app/config.json";

const { home } = config.pages;
const { coverImage } = home.components;

export const CoverImage = () => {
  return (
    <div className="flex w-full h-full max-h-[100dvh] justify-center items-center bg-beige text-black overflow-clip">
      <Image
        alt={coverImage.alt}
        src={coverImage.src}
        width={2000}
        height={2000}
      />
    </div>
  );
};
