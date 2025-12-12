import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

// Declare reducer initial state

interface InitialState {
  authenticated: boolean;
  user: any;
  activeOrg: any;
}

const initialState = {
  user: null,
  activeOrg: null,
  authenticated: false,
} as InitialState;

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
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.authenticated = false;
      state.user = null;
      state.activeOrg = null;

      // localStorage.setItem("authenticated", "false");
      // localStorage.setItem("accessToken", "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, action) => {
          // localStorage.setItem("accessToken", action.payload.accessToken);
          state.authenticated = true;
          state.user = action.payload.user;
        }
      )
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        // localStorage.setItem("accessToken", action.payload.accessToken);
        // localStorage.setItem("authenticated", "true");
        state.authenticated = true;
        state.user = action.payload.user;
      })
      .addMatcher(
        authApi.endpoints.login.matchRejected,
        (state, action: any) => {
          if (action.payload?.data?.tmp_token) {
            // localStorage.setItem("accessToken", action.payload?.data.tmp_token);
            // window.location.replace("verify-account");
          }
        }
      )
      .addMatcher(
        authApi.endpoints.createFirstOrganization.matchFulfilled,
        (state, action) => {
          // localStorage.setItem("authenticated", "true");
          state.authenticated = true;
        }
      )
      .addMatcher(
        authApi.endpoints.getProfileInfo.matchFulfilled,
        (state, action: any) => {
          // localStorage.setItem("authenticated", "true");
          state.authenticated = true;
          state.user = action.payload.userInfo;
          state.activeOrg = action.payload.activeOrganization;
        }
      )
      .addMatcher(
        authApi.endpoints.checkVerificationLink.matchFulfilled,
        (state, action: any) => {
          // localStorage.setItem("accessToken", action.payload.accessToken);
          // localStorage.setItem("authenticated", "true");
          state.authenticated = true;
        }
      )
      .addMatcher(
        authApi.endpoints.checkVerificationLinkForNewAccount.matchFulfilled,
        (state, action: any) => {
          localStorage.setItem("accessToken", action.payload.accessToken);
        }
      );
  },
});

export default slice.reducer;

export const { logout } = slice.actions;
