import type { Metadata } from "next";
import "@/app/globals.css";
import config from "@/app/config.json";
import { Header } from "@/components/header";

const { title, description } = config.metadata;

export const metadata: Metadata = {
  title,
  description,
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
        <div className="grid grid-flow-row w-full h-full">{children}</div>
      </body>
    </html>
  );
}
