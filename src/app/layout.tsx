import type { Metadata } from "next";
import "@/app/globals.css";
import config from "@/app/config.json";
import { Header, Footer } from "@/components";

const { title, description } = config.metadata;

export const metadata: Metadata = {
  title,
  description,
};

const Main = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="grid grid-flow-row w-full h-full">{children}</div>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}
