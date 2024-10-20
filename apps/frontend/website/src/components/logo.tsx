import Image from "next/image";
import config from "@/app/config.json";

const { home } = config.pages;
const { instagram } = home.components;

export const Logo = () => {
  return (
    <Image
      className="rounded-3xl"
      src={instagram.logo.src}
      alt={instagram.logo.alt}
      width={200}
      height={200}
    />
  );
};
