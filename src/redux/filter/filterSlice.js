import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "Show all",
};

const filterSlice = createSlice({
  name: "filterState",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { changeFilter } = filterSlice.actions;
