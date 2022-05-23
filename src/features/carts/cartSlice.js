import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  status: "idle",
  error: null,
  cartItems:
    // localStorage.getItem("cartItems")
    //   ? JSON.parse(localStorage.getItem("cartItems"))
    //   :
    [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  delivery: {
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  },
};
// export const ADD_TO_CART = "ADD_TO_CART";
// export const REMOVE_ITEM = "REMOVE_ITEM";
// export const SUB_QUANTITY = "SUB_QUANTITY";
// export const ADD_QUANTITY = "ADD_QUANTITY";
// export const CLEAR_CART = "CLEAR_CART";
// export const SET_DELIVERY = "SET_DELIVERY";

// export const addToCart = (state, action) => {
//   let product;
//   switch (action.type) {
//     case ADD_TO_CART:
//       product = action.payload;
//       const found = state.cartProducts.find(
//         (cartProduct) => cartProduct._id === product._id
//       );
//       if (found) {
//         return {
//           ...state,
//           cart: state.cartProducts.map((cartProduct) => {
//             if (cartProduct._id === product._id) {
//               return { ...cartProduct, quantity: cartProduct.quantity + 1 };
//             }
//             return cartProduct;
//           }),
//         };
//       } else {
//         return {
//           ...state,
//           cart: [...state.cartProducts, { ...product, quantity: 1 }],
//         };
//       }

//     case ADD_QUANTITY:
//       return {
//         ...state,
//         cart: state.cartProducts.map((cartProduct) => {
//           if (cartProduct._id === action.payload) {
//             return { ...cartProduct, quantity: cartProduct.quantity + 1 };
//           }
//           return cartProduct;
//         }),
//       };

//     case SUB_QUANTITY:
//       return {
//         ...state,
//         cart: state.cartProducts
//           .map((cartProduct) => {
//             if (cartProduct._id === action.payload) {
//               return { ...cartProduct, quantity: cartProduct.quantity - 1 };
//             }
//             return cartProduct;
//           })
//           .filter((product) => product.quantity > 0),
//       };

//     case REMOVE_ITEM:
//       return {
//         ...state,
//         cart: state.cartProducts.filter(
//           (product) => product._id !== action.payload
//         ),
//       };

//     case CLEAR_CART:
//       return { ...state, cart: [] };

//     case SET_DELIVERY:
//       return { ...state, delivery: action.payload };

//     default:
//       return state;
//   }
// };

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
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex].cartQuantity += 1;
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
      }
    },
    decreaseQuant(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      console.log("index", itemIndex);
      console.log("item", action.payload._id);
      console.log("quant", state.cartItems[itemIndex].cartQuantity);
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        console.log("next cart", nextCartItems);
        state.cartItems = nextCartItems;
        console.log("cart", state.cartItems);
      }
    },
    increaseQuant(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex].cartQuantity += 1;
      }
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartItems = nextCartItems;
    },

    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      total = parseFloat(total);
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = Math.round(total * 1000) / 1000;
    },
    clearCart(state, action) {
      state.cartItems = [];
    },
    setDelivery(state, action) {
      return { ...state, delivery: action.payload };
    },
  },
});

export const {
  addToCart,
  decreaseQuant,
  increaseQuant,
  removeFromCart,
  getTotals,
  clearCart,
  setDelivery,
} = slice.actions;

export const checkout = createAsyncThunk(
  "order/addNewOrder",
  async ({ order, cb }, { getState, dispatch }) => {
    console.log(order);
    const spreadsheetId = getState().website?.website?.spreadsheetId;
    const itemlist = order.cartItems
      .map((item) => `-${item.name}x${item.cartQuantity}`)
      .join("\n");
    const response = await apiService.post(`/google/${spreadsheetId}/Order`, {
      Name: order.delivery.name,
      Phone_Number: order.delivery.phone,
      Address: order.delivery.address,
      City: order.delivery.city,
      Country: order.delivery.country,
      Items: itemlist,
      Amount: order.cartTotalAmount,
    });
    cb();
    return response.data.data;
  }
);
export default slice.reducer;
