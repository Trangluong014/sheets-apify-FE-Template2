import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  status: "idle",
  error: null,
  totalPage: 0,
  website: {},
};

const slice = createSlice({
  name: "website",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleWebsite.pending, (state, action) => {
        state.status = "loading";
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getSingleWebsite.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoading = false;
        state.error = "";
        state.website = action.payload.web;
      })
      .addCase(getSingleWebsite.rejected, (state, action) => {
        state.status = "fail";
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const getSingleWebsite = createAsyncThunk(
  "websites/getSingleWebsite",
  async ({ webId }) => {
    const response = await apiService.get(`/web/${webId}`);
    return response.data.data;
  }
);

export default slice.reducer;
