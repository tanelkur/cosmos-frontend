import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingCart: [],
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    SET_CART_ADD_ITEM(state, action) {
      state.shoppingCart = [...state.shoppingCart, action.payload];
    },
    SET_CART_DELETE_ITEM(state, action) {
      state.shoppingCart = action.payload;
    },
    SET_EMTY_CART(state) {
      state.shoppingCart = [];
    },
  },
});

export const { SET_CART_ADD_ITEM, SET_CART_DELETE_ITEM, SET_EMTY_CART } =
  shoppingCartSlice.actions;

export const selectShoppingCart = (state) => state.shoppingCart.shoppingCart;

export default shoppingCartSlice.reducer;
