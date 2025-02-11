import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { catalogApi } from "../features/catalog/catalogApi";
import { uiSlice } from "../layout/UISlice";
import { errorApi } from "../features/about/errorApi";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    [errorApi.reducerPath]: errorApi.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catalogApi.middleware, errorApi.middleware),

});


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
