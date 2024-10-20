import { ShopNavigationBar } from "./components/ShopNavigationBar";
import { Title } from "./components/Title";

export default function FilteredShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[25%,75%] h-full w-full">
      <div className="grid grid-flow-row grid-cols-1 h-full w-full">
        <ShopNavigationBar />
      </div>
      <div className="flex flex-col bg-beige text-dark-brown w-full items-center p-4 gap-4">
        <Title />
        <div className="grid grid-flow-col h-full w-full p-4">{children}</div>
      </div>
    </div>
  );
}
