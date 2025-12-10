import { createSlice } from "@reduxjs/toolkit";
import { homeApi } from "./reactjsApi";
import { ReactJsErrorsInterface } from "@/types/ReactJsErrors";

// Declare reducer initial state

const initialState = {
  errors: [],
} as { errors: Array<ReactJsErrorsInterface> };

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
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      homeApi.endpoints.getReactAppErrors.matchFulfilled,
      (state, action: any) => {
        state.errors = action.payload;
      }
    );
  },
});

export default slice.reducer;
