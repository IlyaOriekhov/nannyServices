import { createAsyncThunk } from "@reduxjs/toolkit";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase";

export const getNanniesData = createAsyncThunk(
  "nannies/getNanniesData",
  async (_, thunkAPI) => {
    try {
      const dbRef = ref(database, "nannies");
      return new Promise((resolve) => {
        onValue(dbRef, (snapshot) => {
          const data = snapshot.val();
          resolve(data);
        });
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
