import { Products } from "../components/Products";

export default function TechPage() {
  const products = [
    {
      src: "/assets/Kindle.jpeg",
      name: "kindle",
      description: "a new kind of reading device.",
    },
  ]; // TODO: get these from API

  return <Products products={products} />;
}
