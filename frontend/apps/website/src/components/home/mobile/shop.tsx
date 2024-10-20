import config from "@/app/config.json";
import {
  ShopNowButton as EssentialsShopNowButton,
  EssentialsImages,
} from "../shop";

const { home } = config.pages;
const { shop } = home.components;

export const Essentials = () => {
  return (
    <div className="grid grid-rows-[auto,auto,auto] bg-beige text-black overflow-clip items-center h-[100dvh]">
      <div className="flex flex-col w-full justify-end h-full p-4">
        <h1 className="text-center text-xl p-4">{shop.title}</h1>
        <hr className="border-dark-brown border-b-[1px] w-full" />
      </div>
      <div className="flex w-full max-w-[100dvw] items-center overflow-x-auto p-4 gap-4">
        <EssentialsImages />
      </div>
      <div className="flex flex-col w-full items-center justify-start h-full p-4">
        <EssentialsShopNowButton />
      </div>
    </div>
  );
};
