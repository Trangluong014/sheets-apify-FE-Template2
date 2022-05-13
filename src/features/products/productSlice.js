import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { LIMIT_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  status: "idle",
  error: null,
  products: [],
  totalPage: 0,
  product: {},
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = "loading";
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoading = false;
        state.error = "";
        state.products = action.payload.itemList;
        state.totalPage = action.payload.totalPage;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "fail";
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getSingleProduct.pending, (state, action) => {
        state.status = "loading";
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoading = false;
        state.error = "";
        state.product = action.payload.item;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.status = "fail";
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async ({ spreadsheetId, productId }) => {
    const response = await apiService.get(
      `/item/single/${spreadsheetId}/${productId}`
    );
    return response.data.data;
  }
);
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({
    limit = LIMIT_PER_PAGE,
    spreadsheetId,
    page,
    searchquery,
    sort,
    order,
    gender,
    category,
    pricequery,
  }) => {
    console.log(searchquery);
    console.log(pricequery);

    const params = {
      limit,
      page,
      ...searchquery,
      sort,
      order,
      gender,
      category,
      ...pricequery,
    };

    const response = await apiService.get(`/item/all/${spreadsheetId}`, {
      params,
    });
    return response.data.data;
  }
);

export default slice.reducer;
