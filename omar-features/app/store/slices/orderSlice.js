import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const { cartItems, userInfo } = action.payload;
      const id = Date.now().toString();
      const newOrder = {
        id,
        items: cartItems,
        status: 'waiting',
        user: { ...userInfo, id: 'user1' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.orders.push(newOrder);
    },
    updateOrderStatus: (state, action) => {
      const { orderId, newStatus } = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      if (order) {
        order.status = newStatus;
        order.updatedAt = new Date().toISOString();
      }
    },
    syncOrdersFromAPI: (state, action) => {
      // Sync orders from API, merging with local changes
      const apiOrders = action.payload;
      // Keep local orders that aren't in API, but update existing ones
      const localOnlyOrders = state.orders.filter(local =>
        !apiOrders.some(api => api.id === local.id)
      );
      state.orders = [...apiOrders, ...localOnlyOrders];
    },
  },
});

export const { placeOrder, updateOrderStatus, syncOrdersFromAPI } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectUserOrders = (state, userId) =>
  state.order.orders.filter(order => order.user.id === userId);
export const selectAllOrders = (state) => state.order.orders;

export default orderSlice.reducer;
