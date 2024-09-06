import {
  ActiveWearAndAccessories,
  Blog,
  CoverImage,
  Instagram,
  Essentials,
  Supplements,
} from "@/components/home";

const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="grid grid-flow-row w-full h-full overflow-x-auto scroll-smooth">
      {children}
    </div>
  );
};

export default function Home() {
  return (
    <Container>
      <CoverImage />
      <Instagram />
      <Blog />
      <Essentials />
      <Supplements />
      <ActiveWearAndAccessories />
    </Container>
  );
}
