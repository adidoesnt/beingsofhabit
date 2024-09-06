import {
  Blog,
  CoverImage,
  Instagram,
  Shop,
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
      <Shop />
      <Supplements />
    </Container>
  );
}
