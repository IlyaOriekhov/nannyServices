import { createSlice } from "@reduxjs/toolkit";
import { getNanniesData } from "./operations";

const initialState = {
  nanniesData: [],
  isLoading: false,
  error: null,
};

const nanniesSlice = createSlice({
  name: "nannies",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getNanniesData.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getNanniesData.fulfilled, (state, action) => {
        state.nanniesData = action.payload;
        state.isLoading = false;
        state.error = null;
      })

      .addCase(getNanniesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const nanniesReducer = nanniesSlice.reducer;
