import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productsCount: 0,
  ordersCount: 0,
  categoriesCount: 0,
  usersCount: 0,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setProductsCount: (state, action) => {
      state.productsCount = action.payload;
    },
    setOrdersCount: (state, action) => {
      state.ordersCount = action.payload;
    },
    setCategoriesCount: (state, action) => {
      state.categoriesCount = action.payload;
    },
    setUsersCount: (state, action) => {
      state.usersCount = action.payload;
    },
    syncAdminCountsFromAPI: (state, action) => {
      const { products, orders, categories, users } = action.payload;
      state.productsCount = products?.length || 0;
      state.ordersCount = orders?.length || 0;
      state.categoriesCount = categories?.length || 0;
      state.usersCount = users?.length || 0;
    },
  },
});

export const {
  setProductsCount,
  setOrdersCount,
  setCategoriesCount,
  setUsersCount,
  syncAdminCountsFromAPI
} = adminSlice.actions;

export const selectProductsCount = (state) => state.admin.productsCount;
export const selectOrdersCount = (state) => state.admin.ordersCount;
export const selectCategoriesCount = (state) => state.admin.categoriesCount;
export const selectUsersCount = (state) => state.admin.usersCount;

export default adminSlice.reducer;
