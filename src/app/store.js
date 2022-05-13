import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import websiteReducer from "../features/websites/websiteSlice";
const rootReducer = {
  product: productReducer,
  website: websiteReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
