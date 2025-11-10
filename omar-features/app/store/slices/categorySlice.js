import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    { id: '1', title: 'Living Room', description: 'Comfortable furniture for your living space', hasBrands: true },
    { id: '2', title: 'Bedroom', description: 'Restful furniture for your bedroom', hasBrands: false },
    { id: '3', title: 'Kitchen', description: 'Functional kitchen furniture and appliances', hasBrands: true },
    { id: '4', title: 'Dining Room', description: 'Elegant dining furniture for family meals', hasBrands: false },
    { id: '5', title: 'Office', description: 'Productive workspace furniture', hasBrands: true },
  ],
  loading: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = {
        id: Date.now().toString(),
        ...action.payload,
      };
      state.categories.push(newCategory);
    },
    updateCategory: (state, action) => {
      const { id, updatedCategory } = action.payload;
      const category = state.categories.find(cat => cat.id === id);
      if (category) {
        Object.assign(category, updatedCategory);
      }
    },
    deleteCategory: (state, action) => {
      const id = action.payload;
      state.categories = state.categories.filter(category => category.id !== id);
    },
    syncCategoriesFromAPI: (state, action) => {
      // Sync categories from API, merging with local changes
      const apiCategories = action.payload;
      // Keep local categories that aren't in API, but update existing ones
      const localOnlyCategories = state.categories.filter(local =>
        !apiCategories.some(api => api.id == local.id)
      );
      state.categories = [...apiCategories, ...localOnlyCategories];
      state.loading = false;
    },
  },
});

export const { addCategory, updateCategory, deleteCategory, syncCategoriesFromAPI } = categorySlice.actions;

export const selectCategories = (state) => state.category.categories;
export const selectCategoryLoading = (state) => state.category.loading;
export const selectCategoryById = (state, id) =>
  state.category.categories.find(category => category.id === id);

export default categorySlice.reducer;
