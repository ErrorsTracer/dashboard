import { api } from "../generic-api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<{ accessToken: string; user: any }, any>({
      query: (body: any) => ({
        url: `/v0.1/auth/register`,
        method: "POST",
        body,
      }),
    }),

    login: build.mutation<{ accessToken: string; user: any }, any>({
      query: (body: any) => ({
        url: `/v0.1/auth/login`,
        method: "POST",
        body,
      }),
    }),
    createFirstOrganization: build.mutation<{ data: any }, any>({
      query: (body: any) => ({
        url: `/v0.1/auth/setup-organization`,
        method: "POST",
        body,
      }),
    }),
    getProfileInfo: build.mutation<{ data: any }, any>({
      query: (id: any) => ({
        url: `/v0.1/auth/user`,
        method: "GET",
      }),
    }),
    resendEmail: build.mutation<{ data: any }, any>({
      query: (body: any) => ({
        url: `/v0.1/auth/resend-verification-email`,
        method: "POST",
      }),
    }),
    checkVerificationLink: build.mutation<{ data: any }, any>({
      query: (body: any) => ({
        url: `/v0.1/auth/check-verification-link`,
        method: "POST",
        body,
      }),
    }),
    checkVerificationLinkForNewAccount: build.mutation<{ data: any }, any>({
      query: (body: any) => ({
        url: `/v0.1/auth/check-verification-link`,
        method: "POST",
        body,
      }),
    }),
    getPlans: build.mutation<{ data: any }, any>({
      query: (id: any) => ({
        url: `/v0.1/plans`,
        method: "GET",
      }),
    }),
    googleAuth: build.mutation<{ data: any }, any>({
      query: (id: any) => ({
        url: `/v0.1/auth/google`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useCreateFirstOrganizationMutation,
  useLoginMutation,
  useGetProfileInfoMutation,
  useResendEmailMutation,
  useCheckVerificationLinkMutation,
  useCheckVerificationLinkForNewAccountMutation,
  useGetPlansMutation,
  useGoogleAuthMutation,
} = authApi;
