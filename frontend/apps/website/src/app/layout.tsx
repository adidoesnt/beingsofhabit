import type { Metadata } from "next";
import "@/app/globals.css";
import config from "@/app/config.json";
import { Header, Footer } from "../components";
import { useIsMobile } from "../utils/mobile";

const { title, description } = config.metadata;

export const metadata: Metadata = {
  title,
  description,
};

const Main = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex w-full justify-center items-center">{children}</div>
  );
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = await useIsMobile();
  return (
    <html lang="en">
      <body>
        {!isMobile && <Header />}
        <Main>{children}</Main>
        {!isMobile && <Footer />}
      </body>
    </html>
  );
}
