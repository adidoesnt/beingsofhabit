import { Products } from "../components/Products";

export default function SupplementsAndBlendsPage() {
  const products = [
    {
      src: "/assets/Supplements.jpeg",
      name: "supplements",
      description: "reparative, nourishing, and potent supplements.",
    },
  ]; // TODO: get these from API

  return <Products products={products} />;
}
