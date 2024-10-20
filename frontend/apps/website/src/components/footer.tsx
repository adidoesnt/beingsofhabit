import config from "@/app/config.json";
import { Link } from ".";
import { Logo } from "./logo";

const { footer } = config.components;

export const Container = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="grid grid-cols-2 h-fit justify-center items-center bg-dark-brown text-light-brown">
      {children}
    </div>
  );
};

const PoweredBy = () => {
  const { text, href } = footer.poweredBy;
  return (
    <div className="flex flex-col gap-2 items-center p-16">
      <Logo />
      <a href={href} target="_blank">
        <p className="text-center text-sm">{text}</p>
      </a>
    </div>
  );
};

const Links = () => {
  return (
    <ul className="flex justify-center">
      <div className="flex flex-col gap-2 items-left p-8">
        {footer.links.map((link) => (
          <Link {...link} key={link.label} />
        ))}
      </div>
    </ul>
  );
};

export const Footer = () => {
  return (
    <Container>
      <Links />
      <PoweredBy />
    </Container>
  );
};
