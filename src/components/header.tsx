import config from "@/app/config.json";

const { header } = config.components;
const home = header.links.find((link) => link.label === "home");

type Link = {
  label: string;
  href: string;
};

const Title = () => {
  return (
    <div className="flex w-[25%] justify-center">
      <a href={home?.href}>
        <h1>{header.title}</h1>
      </a>
    </div>
  );
};

const Link = ({ href, label }: Link) => {
  return (
    <li>
      <a href={href}>{label}</a>
    </li>
  );
};

const Links = () => {
  return (
    <ul className="flex w-[75%] justify-center items-center gap-8">
      {header.links.map((link) => Link({ ...link }))}
    </ul>
  );
};

const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex w-[100dvw] items-center justify-center p-4 h-fit bg-pink-500">
      {children}
    </div>
  );
};

export const Header = () => {
  return (
    <Container>
      <Title />
      <Links />
    </Container>
  );
};
