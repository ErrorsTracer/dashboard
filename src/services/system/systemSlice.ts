import { createSlice } from "@reduxjs/toolkit";

// Declare reducer initial state
interface InitialState {
  systemLoading: boolean;
  screenLoading: boolean;
}
const initialState = {
  screenLoading: false,
  systemLoading: true,
} as InitialState;

const slice = createSlice({
  name: "system",
  initialState,
  reducers: {
    toggleSystemLoading: (state, action) => {
      state.systemLoading = action.payload;
    },
    toggleScreenLoading: (state, action) => {
      state.screenLoading = action.payload;
    },
  },
});

export default slice.reducer;

export const { toggleSystemLoading, toggleScreenLoading } = slice.actions;
