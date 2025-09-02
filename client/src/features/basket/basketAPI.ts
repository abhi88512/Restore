import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Basket, Item } from "../../app/models/basket";
import { Product } from "../../app/models/product";

const isBasketItem = (product: Item | Product): product is Item => {
  return (product as Item).quantity !== undefined;
};
export const basketAPI = createApi({
  reducerPath: "basket",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Basket"],
  endpoints: (builder) => ({
    fetchBasket: builder.query<Basket, void>({
      query: () => `basket`,
      providesTags: ["Basket"],
    }),
    addBasketItem: builder.mutation<
      Basket,
      { product: Product | Item; quantity: number }
    >({
      query: ({ product, quantity }) => {
        const productId = isBasketItem(product)
          ? product.productId
          : product.id;
        return {
          url: `basket?productId=${productId}&quantity=${quantity}`,
          method: "POST",
        };
      },
      onQueryStarted: async (
        { product, quantity },
        { dispatch, queryFulfilled }
      ) => {
        let isNewBasket = false;
        const patchResult = dispatch(
          basketAPI.util.updateQueryData("fetchBasket", undefined, (draft) => {
            const productId = isBasketItem(product)
              ? product.productId
              : product.id;


            if (!draft?.basketId) isNewBasket = true;

            if (!isNewBasket) {
              const existingItem = draft.items.find(
                (item) => item.productId === productId
              );
              if (existingItem) existingItem.quantity += quantity;
              else
                draft.items.push(
                  isBasketItem(product)
                    ? product
                    : { ...product, quantity, productId: product.id }
                );
            }
          })
        );
        try {
          await queryFulfilled;
          if (isNewBasket) dispatch(basketAPI.util.invalidateTags(["Basket"]));
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
    removeBasketItem: builder.mutation<
      void,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `basket?productId=${productId}&quantity=${quantity}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          basketAPI.util.updateQueryData("fetchBasket", undefined, (draft) => {
            const existingItemIndex = draft.items.findIndex(
              (item) => item.productId === productId
            );
            if (existingItemIndex !== -1) {
              draft.items[existingItemIndex].quantity -= quantity;
              if (draft.items[existingItemIndex].quantity <= 0)
                draft.items.splice(existingItemIndex, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchBasketQuery,
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} = basketAPI;
