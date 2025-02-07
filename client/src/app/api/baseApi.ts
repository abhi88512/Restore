import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { stopLoading, startLoading } from "../layout/UISlice";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:5001/api",
});

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  // Start loading
  api.dispatch(startLoading());
  const result = await customBaseQuery(args, api, extraOptions);
  // Stop loading
  api.dispatch(stopLoading());
  if (result.error) {
    const { status, data } = result.error;
    console.log({ status, data });
  }

  return result;
};
