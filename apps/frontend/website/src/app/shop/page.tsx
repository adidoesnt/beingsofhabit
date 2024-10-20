/* eslint-disable @next/next/no-img-element */
import { AnimatedBanner, NavigationBar } from "./components";
import config from "@/app/config.json";
import { Footer } from "../../components";
import { MobileHeader } from "../../components/home/mobile";
import { useIsMobile } from "../../utils/mobile";

const { image } = config.pages.shop.components;

export default async function ShopPage() {
  const isMobile = await useIsMobile();

  return (
    <div className="overflow-hidden flex flex-col bg-beige w-full text-black items-center gap-4">
      {isMobile && <MobileHeader />}
      <AnimatedBanner />
      <h1 className="text-4xl">shop all</h1>
      <NavigationBar />
      <img
        src={image.src}
        alt={image.alt}
        className="flex flex-grow w-full object-cover py-4 bg-gray-300"
      />
      {isMobile && <Footer />}
    </div>
  );
}
