import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { LIMIT_PER_PAGE } from "../../app/config";
import { SPREADSHEETID } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  totalPage: 0,
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { products, totalPage } = action.payload;
      state.products = products;
      state.totalPage = totalPage;
    },
  },
});

export const getProducts =
  ({
    page,
    limit = LIMIT_PER_PAGE,
    id = SPREADSHEETID,
    search,
    filter,
    sort,
    order,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit, sort, order, search, filter };

      const response = await apiService.get(`/item/${id}`, { params });
      dispatch(slice.actions.getProductsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
