import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import websiteReducer from "../features/websites/websiteSlice";
import cartReducer from "../features/carts/cartSlice";

const rootReducer = {
  product: productReducer,
  website: websiteReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
