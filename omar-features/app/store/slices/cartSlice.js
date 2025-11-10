import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    updateQuantity: (state, action) => {
      const { id, newQuantity } = action.payload;
      if (newQuantity < 1) return;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.quantity = newQuantity;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectCartItemCount = (state) =>
  state.cart.cart.reduce((total, item) => total + (item.quantity || 1), 0);

export default cartSlice.reducer;
