import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromCookies } from "./actions";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,

  prepareHeaders: async (headers, { getState }) => {
    const accessToken = await getTokenFromCookies();

    headers.set("authorization", `bearer ${accessToken}`);

    return headers;
  },
});

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery,
  tagTypes: [""],

  endpoints: () => ({}),
});
