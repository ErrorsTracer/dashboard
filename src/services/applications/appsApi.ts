import { api } from "../generic-api";

export const appsApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getApps: build.mutation<{ data: Array<any> }, any>({
      query: (query: any) => ({
        url: `/v0.1/applications`,
        method: "GET",
      }),
    }),
    getAppsTypes: build.mutation<{ data: Array<any> }, any>({
      query: (query: any) => ({
        url: `/v0.1/applications/types`,
        method: "GET",
      }),
    }),
    createApplication: build.mutation<{ data: Array<any> }, any>({
      query: (body: any) => ({
        url: `/v0.1/applications`,
        method: "POST",
        body: body,
      }),
    }),
    getAppInfo: build.mutation<{ data: Array<any> }, any>({
      query: (id: any) => ({
        url: `/v0.1/applications/${id}`,
        method: "GET",
      }),
    }),
    sendInvitation: build.mutation<{ data: Array<any> }, any>({
      query: (data: any) => ({
        url: `/v0.1/applications/${data.id}/invite`,
        method: "POST",
        body: data.body,
      }),
    }),
    activateApp: build.mutation<{ data: Array<any> }, any>({
      query: (id: any) => ({
        url: `/v0.1/applications/${id}/activate`,
        method: "PUT",
      }),
    }),
    getAppErrors: build.mutation<{ data: Array<any> }, any>({
      query: (id: any) => ({
        url: `/v0.1/applications/${id}/errors`,
        method: "GET",
      }),
    }),
    deactivateApp: build.mutation<{ data: any }, any>({
      query: (id: any) => ({
        url: `/v0.1/applications/${id}/deactivate`,
        method: "PUT",
      }),
    }),
    deleteApp: build.mutation<{ data: any }, any>({
      query: (id: any) => ({
        url: `/v0.1/applications/${id}`,
        method: "DELETE",
      }),
    }),
    updateAppInfo: build.mutation<{ data: Array<any> }, any>({
      query: (data: any) => ({
        url: `/v0.1/applications/${data.id}`,
        method: "PUT",
        body: data.body,
      }),
    }),
    deleteMembership: build.mutation<{ data: any }, any>({
      query: (id: any) => ({
        url: `/v0.1/applications/${id}/membership`,
        method: "DELETE",
      }),
    }),
    deactivateMembership: build.mutation<{ data: any }, any>({
      query: (id: any) => ({
        url: `/v0.1/applications/${id}/membership`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetAppsTypesMutation,
  useCreateApplicationMutation,
  useGetAppsMutation,
  useGetAppInfoMutation,
  useSendInvitationMutation,
  useActivateAppMutation,
  useGetAppErrorsMutation,
  useDeactivateAppMutation,
  useDeleteAppMutation,
  useUpdateAppInfoMutation,
  useDeleteMembershipMutation,
  useDeactivateMembershipMutation,
} = appsApi;
