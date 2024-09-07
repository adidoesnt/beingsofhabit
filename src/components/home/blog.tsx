import Image from "next/image";
import { Logo } from "../logo";
import config from "@/app/config.json";

const { home } = config.pages;
const { blog } = home.components;

const ReadMoreButton = () => {
  return (
    <a href={blog.readMoreButton.href}>
      <button className="px-4 py-2 font-bold border-[1px] border-dull-gray">
        {blog.readMoreButton.text}
      </button>
    </a>
  );
};

const LeftPanel = () => {
  return (
    <div className="flex w-full h-full">
      <Image
        src={blog.coverImage.src}
        alt={blog.coverImage.alt}
        width={1000}
        height={1000}
      />
    </div>
  );
};

const Content = () => {
  return (
    <>
      <p className="text-center text-xl">{blog.content[0]}</p>
      <p className="text-center text-xl">{blog.content[1]}</p>
      <p className="text-center font-bold text-xl">{blog.content[2]}</p>
    </>
  );
};

const RightPanel = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-12">
      <Logo />
      <Content />
      <ReadMoreButton />
    </div>
  );
};

export const Blog = () => {
  return (
    <div className="grid grid-cols-2 w-[100dvw] h-fit bg-olive text-dull-gray">
      <LeftPanel />
      <RightPanel />
    </div>
  );
};
