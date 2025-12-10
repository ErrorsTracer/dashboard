import { ReactJsErrorsInterface } from "@/ts/redux";
import { api } from "../generic-api";

export const homeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReactAppErrors: build.mutation<
      { data: Array<ReactJsErrorsInterface> },
      any
    >({
      query: (query: any) => ({
        url: `/v0.1/trace`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetReactAppErrorsMutation } = homeApi;
