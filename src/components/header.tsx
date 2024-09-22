'use client';

import config from "@/app/config.json";
import { Link } from "@/components";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const { header } = config.components;
const home = header.links.find((link) => link.label === "home");

export const Title = () => {
  return (
    <div className="flex w-[25%] justify-center">
      <a href={home?.href}>
        <h1 className="text-4xl">{header.title}</h1>
      </a>
    </div>
  );
};

const Links = async () => {
  const currentPath = usePathname();
  const currentSubpath = useMemo(() => {
    const path = currentPath
      .split("/")
      .filter(Boolean)
      .join(" ")
      .replace(/-/g, " ");
    return path.trim() === "" ? "home" : path;
  }, [currentPath]);

  return (
    <ul className="flex w-[75%] justify-center items-center gap-8">
      {header.links.map((link) => (
        <Link
          {...link}
          key={link.label}
          active={currentSubpath === link.label}
        />
      ))}
    </ul>
  );
};

const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex w-[100dvw] items-center justify-center p-4 h-fit bg-beige text-dark-brown border-dark-brown border-b-[1px]">
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
