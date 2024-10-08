import {
  ActiveWearAndAccessories,
  Blog,
  CoverImage,
  Instagram,
  Essentials,
  Supplements,
  HomeDecor,
  Tech,
  JournalsAndBooks,
  Haircare,
  Skincare,
} from "@/components/home";

const Container = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="grid grid-flow-row w-full h-full overflow-x-auto scroll-smooth">
      {children}
    </div>
  );
};

export default async function Home() {
  return (
    <Container>
      <CoverImage />
      <Instagram />
      <Blog />
      <Essentials />
      <Supplements />
      <ActiveWearAndAccessories />
      <HomeDecor />
      <Tech />
      <JournalsAndBooks />
      <Skincare />
      <Haircare />
    </Container>
  );
}
