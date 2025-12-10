import { createSlice } from "@reduxjs/toolkit";
import { appsApi } from "./appsApi";

interface InitialState {
  applications: any[];
  sharedApplications: any[];
  appTypes: any[];
  appInfo: any;
  appErrors: any[];
}

const initialState = {
  applications: [],
  sharedApplications: [],
  appTypes: [],
  appInfo: {},
  appErrors: [],
} as InitialState;

const slice = createSlice({
  name: "apps",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        appsApi.endpoints.getAppsTypes.matchFulfilled,
        (state, action: any) => {
          state.appTypes = action.payload;
        }
      )
      .addMatcher(
        appsApi.endpoints.getApps.matchFulfilled,
        (state, action: any) => {
          state.applications = action.payload.myApps;
          state.sharedApplications = action.payload.otherApps;
        }
      )
      .addMatcher(
        appsApi.endpoints.createApplication.matchFulfilled,
        (state, action: any) => {
          window.location.replace(
            `/applications/${action.payload.application}/settings`
          );
        }
      )
      .addMatcher(
        appsApi.endpoints.getAppInfo.matchFulfilled,
        (state, action: any) => {
          state.appInfo = action.payload;
        }
      )
      .addMatcher(
        appsApi.endpoints.sendInvitation.matchFulfilled,
        (state, action: any) => {
          state.appInfo = action.payload;
        }
      )
      .addMatcher(
        appsApi.endpoints.activateApp.matchFulfilled,
        (state, action: any) => {
          state.appInfo = action.payload;
        }
      )
      .addMatcher(
        appsApi.endpoints.getAppErrors.matchFulfilled,
        (state, action: any) => {
          state.appErrors = action.payload;
        }
      )
      .addMatcher(
        appsApi.endpoints.deactivateApp.matchFulfilled,
        (state, action: any) => {
          state.appInfo = action.payload;
        }
      )
      .addMatcher(
        appsApi.endpoints.updateAppInfo.matchFulfilled,
        (state, action: any) => {
          state.appInfo = action.payload;
        }
      )
      .addMatcher(
        appsApi.endpoints.deleteMembership.matchFulfilled,
        (state, action: any) => {
          state.appInfo = action.payload;
        }
      )
      .addMatcher(
        appsApi.endpoints.deactivateMembership.matchFulfilled,
        (state, action: any) => {
          state.appInfo = action.payload;
        }
      );
  },
});

export default slice.reducer;
