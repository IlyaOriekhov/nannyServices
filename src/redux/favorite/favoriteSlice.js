import { createSlice } from "@reduxjs/toolkit";

export const storageKey = "favorite";

const getInitialState = () => {
  const favorite = localStorage.getItem(storageKey);
  return favorite !== null ? JSON.parse(favorite) : [];
};

const initialState = {
  favorite: getInitialState(),
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      state.favorite.push(action.payload);
    },
    deleteFromFavorite: (state, action) => {
      state.favorite = state.favorite.filter(
        (nannie) => nannie !== action.payload
      );
    },
  },
});

export const favoriteReducer = favoriteSlice.reducer;
export const { addToFavorite, deleteFromFavorite } = favoriteSlice.actions;
