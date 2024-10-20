import { Products } from "../components/Products";

export default function ActiveWearAndAccessoriesPage() {
  const products = [
    {
      src: "/assets/Yoga.jpeg",
      name: "yoga",
      description: "comfortable apparel for yoga.",
    },
  ]; // TODO: get these from API

  return <Products products={products} />;
}
