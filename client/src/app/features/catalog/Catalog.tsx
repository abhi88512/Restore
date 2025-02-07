import { useFetchProductsQuery } from "./catalogApi";
import ProductList from "./ProductList";

export default function Catalog() {
  const { data: allProducts, isLoading } = useFetchProductsQuery();
  if (isLoading || !allProducts) return <div>Loading...</div>;
  return (
    <>
      <ProductList products={allProducts} />
    </>
  );
}
