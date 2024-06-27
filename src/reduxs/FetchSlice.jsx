import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (searchTerm) => {
    try {
      const API_KEY =
        "Q3AiW7OoFtr3exI14eeBvGxvMDkReaWEGX7dKWakTgApg1l1o7R7wWdB";
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${searchTerm}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = {
  loading: false,
  images: [],
  error: null,
};

const fetchSlice = createSlice({
  name: "images",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fetchSlice.reducer;
