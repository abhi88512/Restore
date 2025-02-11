import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { stopLoading, startLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:5001/api",
});

type ErrorResponse =
  | string
  | { title: string }
  | { title: string; errors: string[] }
  | {errors: string[]};


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

    const errorData = data as ErrorResponse;

    // console.log({ status, data });

    switch (status) {
      case 400:
        if (typeof errorData === "object" && "errors" in errorData) {
          if (typeof errorData.errors === "object") {
            // Handle errors as object - get all error messages and join them
            const errorMessages = Object.values(errorData.errors).flat();
            toast.error(errorMessages.join(", "));
          } else {
            toast.error("Validation error occurred");
          }
        } else if (typeof errorData === "object" && "title" in errorData) {
          toast.error(errorData.title);
        } else {
          toast.error("Bad Request");
        }
        break;
      case 401:
        if (typeof errorData === "object" && "title" in errorData) {
          toast.error(errorData.title);
        } else {
          toast.error("Unauthorized");
        }
        break;
      case 404:
        if (typeof errorData === "object" && "title" in errorData) {
          router.navigate('/not-found', {state: {error: errorData}})
        } else {
          toast.error("Not Found");
        }
        break;
      case 500:
        if (typeof errorData === "object" && "title" in errorData) {
            router.navigate('/server-error', {state: {error: errorData}})
        } else {
          toast.error("Internal Server Error");
        }
        break;

      default:
        break;
    }
  }

  return result;
};
