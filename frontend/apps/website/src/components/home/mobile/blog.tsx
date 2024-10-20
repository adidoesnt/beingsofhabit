import { BlogContent } from "../blog";

export type MobileBlogProps = {
  backgroundImageSrc: string;
};

export const Blog = ({ backgroundImageSrc }: Readonly<MobileBlogProps>) => {
  return (
    <div
      className="flex w-[100dvw] h-fit bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImageSrc})`,
      }}
    >
      <div className="flex justify-center items-start bg-olive text-beige bg-opacity-75">
        <BlogContent />
      </div>
    </div>
  );
};
