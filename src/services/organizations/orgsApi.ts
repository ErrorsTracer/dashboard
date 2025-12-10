import { api } from "../generic-api";

export const homeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyOrganizations: build.query<{ data: Array<any> }, any>({
      query: (query: any) => ({
        url: `/v0.1/organizations`,
        method: "GET",
      }),
    }),
    inviteMember: build.mutation<{ data: Array<any> }, any>({
      query: (data: any) => ({
        url: `/v0.1/organizations/${data.id}/invite`,
        method: "POST",
        body: data.body,
      }),
    }),
    switchOrganization: build.mutation<{ data: Array<any> }, any>({
      query: (id: any) => ({
        url: `/v0.1/organizations/${id}/switch`,
        method: "PUT",
      }),
    }),
    createOrganization: build.mutation<{ data: Array<any> }, any>({
      query: (body: any) => ({
        url: `/v0.1/organizations`,
        method: "POST",
        body,
      }),
    }),

    getOrganizationCredentials: build.mutation<{ data: Array<any> }, any>({
      query: () => ({
        url: `/v0.1/organizations/credentials`,
        method: "GET",
      }),
    }),

    leaveOrganization: build.mutation<{ data: Array<any> }, any>({
      query: (id: any) => ({
        url: `/v0.1/organizations/${id}`,
        method: "PUT",
      }),
    }),
    getOrgReports: build.mutation<{ data: Array<any> }, any>({
      query: (id: any) => ({
        url: `/v0.1/organizations/general-reports`,
        method: "GET",
      }),
    }),
    deleteOrg: build.mutation<{ data: Array<any> }, any>({
      query: (id: any) => ({
        url: `/v0.1/organizations/${id}`,
        method: "DELETE",
      }),
    }),
    acceptMembership: build.mutation<{ data: Array<any> }, any>({
      query: (body: any) => ({
        url: `/v0.1/organizations/membership/verify-invitation`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  // useGetMyOrganizationsMutation,
  useGetMyOrganizationsQuery,
  useInviteMemberMutation,
  useSwitchOrganizationMutation,
  useCreateOrganizationMutation,
  useGetOrganizationCredentialsMutation,
  useLeaveOrganizationMutation,
  useGetOrgReportsMutation,
  useDeleteOrgMutation,
  useAcceptMembershipMutation,
} = homeApi;
