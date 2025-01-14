import { Box } from "@mui/material";
import { Product } from "../../models/product";
import ProductCard from "./ProductCard";

type Prop = {
  products: Product[];
};
export default function ProductList({ products }: Prop) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Box>
  );
}
