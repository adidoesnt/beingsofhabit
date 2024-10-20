import { Footer } from "../components";
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
} from "../components/home";
import { MobileHeader } from "../components/home/mobile";
import { useIsMobile } from "../utils/mobile";

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
  const isMobile = await useIsMobile();

  return (
    <Container>
      {isMobile && <MobileHeader />}
      <CoverImage />
      <Instagram />
      <Blog />
      <Essentials />
      <Supplements />
      <ActiveWearAndAccessories />
      <HomeDecor />
      <Tech />
      <JournalsAndBooks />
      {isMobile && <Footer />}
    </Container>
  );
}
