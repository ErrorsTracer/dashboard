import { createSlice } from "@reduxjs/toolkit";
import { homeApi } from "./orgsApi";

const initialState = {
  organizations: [],
  credentials: {},
  orgReports: {},
} as { organizations: Array<any>; credentials: any; orgReports: any };

/**
 * RTK Slice Factory Function with pre-initialized state.
 *
 * API endpoint matchers are created inside of the extraReducers' scope.
 *
 * The only matchers handled are matchFulfilled matchers.
 *
 * The rest of the matchers are handled in an interceptor middleware.
 */

const slice = createSlice({
  name: "orgs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        homeApi.endpoints.getMyOrganizations.matchFulfilled,
        (state, action: any) => {
          state.organizations = action.payload;
        }
      )
      .addMatcher(
        homeApi.endpoints.createOrganization.matchFulfilled,
        (state, action: any) => {
          state.organizations = action.payload;
        }
      )
      .addMatcher(
        homeApi.endpoints.getOrganizationCredentials.matchFulfilled,
        (state, action: any) => {
          state.credentials = action.payload;
        }
      )
      .addMatcher(
        homeApi.endpoints.leaveOrganization.matchFulfilled,
        (state, action: any) => {
          state.organizations = action.payload;
        }
      )
      .addMatcher(
        homeApi.endpoints.getOrgReports.matchFulfilled,
        (state, action: any) => {
          state.orgReports = action.payload;
        }
      );
  },
});

export default slice.reducer;
