import { useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";
import {
  useFetchBasketQuery,
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} from "../basket/basketAPI";
import { useEffect, useState } from "react";
export default function ProductDetails() {
  const { id } = useParams();
  const [addItemToBasket] = useAddBasketItemMutation();
  const [removeItemFromBasket] = useRemoveBasketItemMutation();
  const [quantity, setQuantity] = useState(0);

  
  const { data: basket } = useFetchBasketQuery();
  const item = basket?.items.find((i) => i.productId === Number(id));

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
  }, [item]);

  const { data: product, isLoading } = useFetchProductDetailsQuery(id ? Number(id) : 0);

  if (!product || isLoading) return <div>Loading...</div>;

  const handleUpdateBasket = () => {
    const updatedQuantity = item ? Math.abs(quantity - item.quantity) : quantity;
    if (!item || quantity > item.quantity) {      
      addItemToBasket({product, quantity: updatedQuantity});
    } else {
      removeItemFromBasket({productId: product.id, quantity: updatedQuantity});
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const parsedValue = parseInt(value);
    if (parsedValue > 0) {
      setQuantity(parsedValue);
    }
  }


  


  const productDetails = [
    { label: "Name", value: product.name },
    { label: "Description", value: product.description },
    { label: "Type", value: product.type },
    { label: "Brand", value: product.brand },
    { label: "Quantity in Stock", value: product.quantityInStock },
  ];

  return (
    <Grid2 container spacing={6} maxWidth="lg" sx={{ mx: "auto" }}>
      <Grid2 size={6}>
        <img
          src={product?.pictureUrl}
          alt={product?.name}
          style={{ width: "100%" }}
        />
      </Grid2>
      <Grid2 size={6}>
        <Typography variant="h3">{product?.name}</Typography>
        <Divider sx={{ mb: "2" }} />
        <Typography variant="h4" color="secondary">
          ${(product?.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table sx={{ "& td": { fontSize: "1rem" } }}>
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {detail.label}
                  </TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid2 container spacing={3} marginTop={3}>
          <Grid2 size={6}>
            <TextField
              variant="outlined"
              label="Quantity"
              type="number"
              value={quantity}
              fullWidth
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <Button
              sx={{ height: "55px" }}
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              onClick={handleUpdateBasket}
              disabled={item?.quantity === quantity || quantity === 0}
            >
              {item ? "Update Quantity" : "Add to Basket"}
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
