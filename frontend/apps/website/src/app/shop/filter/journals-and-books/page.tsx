import { Products } from "../components/Products";

export default function JournalsAndBooksPage() {
  const products = [
    {
      src: "/assets/BooksAndPencils.jpeg",
      name: "books and pencils",
      description: "journals and books for reflection and growth.",
    },
  ]; // TODO: get these from API

  return <Products products={products} />;
}
