import { createSlice } from "@reduxjs/toolkit";
import { getUser, logIn, logOut, register } from "./operations";

const initialState = {
  user: "",
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleFulfilled = (state) => {
  state.isLoading = false;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => handlePending(state))
      .addCase(register.fulfilled, (state) => handleFulfilled(state))
      .addCase(register.rejected, (state, action) =>
        handleRejected(state, action)
      )

      .addCase(logIn.pending, (state) => handlePending(state))
      .addCase(logIn.fulfilled, (state, action) => {
        handleFulfilled(state);
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => handleRejected(state, action))

      .addCase(logOut.pending, (state) => handlePending(state))
      .addCase(logOut.fulfilled, (state) => {
        handleFulfilled(state);
        state.user = "";
      })
      .addCase(logOut.rejected, (state, action) =>
        handleRejected(state, action)
      )

      .addCase(getUser.pending, (state) => handlePending(state))
      .addCase(getUser.fulfilled, (state, action) => {
        handleFulfilled(state);
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) =>
        handleRejected(state, action)
      );
  },
});

export const authReducer = authSlice.reducer;
