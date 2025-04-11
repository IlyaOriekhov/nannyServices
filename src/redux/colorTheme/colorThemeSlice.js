import { createSlice } from "@reduxjs/toolkit";

export const storageKey = "colorTheme";

const initialState = {
  color: "red",
};

const colorThemeSlice = createSlice({
  name: "colorTheme",
  initialState,
  reducers: {
    changeColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const colorThemeReducer = colorThemeSlice.reducer;
export const { changeColor } = colorThemeSlice.actions;
