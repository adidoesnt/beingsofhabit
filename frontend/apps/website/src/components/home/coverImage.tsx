/* eslint-disable @next/next/no-img-element */
import config from "@/app/config.json";

const { home } = config.pages;
const { coverImage } = home.components;

export const CoverImage = () => {
  return (
    <div className="flex w-full h-[100vh] justify-center items-center bg-beige text-black overflow-hidden">
      <img
        src={coverImage.src}
        alt={coverImage.alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
