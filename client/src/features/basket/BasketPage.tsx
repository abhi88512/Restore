import { Grid2, Typography } from "@mui/material";
import { useFetchBasketQuery } from "./basketAPI";
import BasketItem from "./BasketItem";
import OrderSummary from "../../app/shared/components/OrderSummery";
const BasketPage = () => {
    const {data: basket, isLoading} = useFetchBasketQuery();

    if (isLoading) return <Typography variant="h2">Loading...</Typography>
    if (!basket || basket.items.length === 0) return <Typography variant="h2">Your basket is empty</Typography>
    return (
        <Grid2 container spacing={2}>
            <Grid2 size={8}>
                {basket.items.map((item) => (
                    <BasketItem key={item.productId} item={item} />
                ))}
            </Grid2>
            <Grid2 size={4}>
                <OrderSummary />
            </Grid2>
        </Grid2>

    );
};

export default BasketPage;