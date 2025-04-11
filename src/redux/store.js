import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { nanniesReducer } from "./nannies/nanniesSlice";
import { authReducer } from "./auth/authSlice";
import { favoriteReducer } from "./favorite/favoriteSlice";
import { colorThemeReducer } from "./colorTheme/colorThemeSlice";
import { filterReducer } from "./filter/filterSlice";

const persistConfig = {
  key: "favorite",
  storage,
};

const persistConfigColor = {
  key: "colorTheme",
  storage,
};

const reducers = combineReducers({
  favorite: persistReducer(persistConfig, favoriteReducer),
  colorTheme: persistReducer(persistConfigColor, colorThemeReducer),
  auth: authReducer,
  nannies: nanniesReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
