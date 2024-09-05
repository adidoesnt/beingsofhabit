import type { Metadata } from "next";
import "./globals.css";
import config from "./config.json";

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
        <div className="grid grid-flow-row w-full h-full justify-center items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
