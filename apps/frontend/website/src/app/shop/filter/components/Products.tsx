/* eslint-disable @next/next/no-img-element */ // TODO: remove
/* eslint-disable @typescript-eslint/no-explicit-any */

export type ProductsProps = {
  products: Array<any>;
};

export const Products = ({ products }: Readonly<ProductsProps>) => {
  return products.map((product: any, index: number) => (
    <div key={index} className="flex flex-col gap-3">
      <img
        src={product.src}
        alt={product.name}
        className="w-[200px] h-[200px] object-cover"
      />
      <p className="font-semibold">{product.name}</p>
      <p className="max-w-[200px] text-wrap">{product.description}</p>
    </div>
  ));
};
