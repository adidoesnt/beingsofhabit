import { Products } from "../components/Products";

export default function HomeDecorPage() {
  const products = [
    {
      src: "/assets/Candles.jpeg",
      name: "candles",
      description: "scented candles for relaxation.",
    },
  ]; // TODO: get these from API

  return <Products products={products} />;
}
