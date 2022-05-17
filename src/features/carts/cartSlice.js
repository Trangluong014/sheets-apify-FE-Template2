import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  status: "idle",
  error: null,
  cartProducts: [],
  delivery: {
    address: "",
    city: "",
    country: "",
  },
};
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const SUB_QUANTITY = "SUB_QUANTITY";
export const ADD_QUANTITY = "ADD_QUANTITY";
export const CLEAR_CART = "CLEAR_CART";
export const SET_DELIVERY = "SET_DELIVERY";

export const addToCart = (state, action) => {
  let product;
  switch (action.type) {
    case ADD_TO_CART:
      product = action.payload;
      const found = state.cartProducts.find(
        (cartProduct) => cartProduct.id === product.id
      );
      if (found) {
        return {
          ...state,
          cart: state.cartProducts.map((cartProduct) => {
            if (cartProduct.id === product.id) {
              return { ...cartProduct, quantity: cartProduct.quantity + 1 };
            }
            return cartProduct;
          }),
        };
      } else {
        return {
          ...state,
          cart: [...state.cartProducts, { ...product, quantity: 1 }],
        };
      }

    case ADD_QUANTITY:
      return {
        ...state,
        cart: state.cartProducts.map((cartProduct) => {
          if (cartProduct.id === action.payload) {
            return { ...cartProduct, quantity: cartProduct.quantity + 1 };
          }
          return cartProduct;
        }),
      };

    case SUB_QUANTITY:
      return {
        ...state,
        cart: state.cartProducts
          .map((cartProduct) => {
            if (cartProduct.id === action.payload) {
              return { ...cartProduct, quantity: cartProduct.quantity - 1 };
            }
            return cartProduct;
          })
          .filter((product) => product.quantity > 0),
      };

    case REMOVE_ITEM:
      return {
        ...state,
        cart: state.cartProducts.filter(
          (product) => product.id !== action.payload
        ),
      };

    case CLEAR_CART:
      return { ...state, cart: [] };

    case SET_DELIVERY:
      return { ...state, delivery: action.payload };

    default:
      return state;
  }
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addToCart,
  },
});

export default slice.reducer;
