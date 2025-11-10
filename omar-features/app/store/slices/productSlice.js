import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  categories: [],
  loading: true,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    addProduct: (state, action) => {
      const newProduct = action.payload;
      const product = {
        id: Date.now(),
        ...newProduct,
        title: newProduct.name,
        price: parseFloat(newProduct.price) || 0,
        category: newProduct.category,
        description: newProduct.description,
        image: newProduct.images && newProduct.images[0]?.url || '/placeholder.png',
        active: newProduct.active !== undefined ? newProduct.active : true,
        stock: parseInt(newProduct.stock) || 0,
        discount: parseInt(newProduct.discount) || 0,
      };
      state.products.push(product);
    },
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const product = state.products.find(p => p.id == id);
      if (product) {
        Object.assign(product, {
          ...updatedProduct,
          title: updatedProduct.name || product.title,
          price: parseFloat(updatedProduct.price) || product.price,
          stock: parseInt(updatedProduct.stock) !== undefined ? parseInt(updatedProduct.stock) : product.stock,
          discount: parseInt(updatedProduct.discount) !== undefined ? parseInt(updatedProduct.discount) : product.discount,
          active: updatedProduct.active !== undefined ? updatedProduct.active : product.active,
          category: updatedProduct.category || product.category,
          description: updatedProduct.description || product.description,
          image: updatedProduct.image || product.image,
        });
      }
    },
    deleteProduct: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter(product => product.id !== id);
    },
    syncProductsFromAPI: (state, action) => {
      // Sync products from API, merging with local changes
      const apiProducts = action.payload;
      // Keep local products that aren't in API, but update existing ones
      const localOnlyProducts = state.products.filter(local =>
        !apiProducts.some(api => api.id == local.id)
      );
      state.products = [...apiProducts, ...localOnlyProducts];
      state.loading = false;
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct, syncProductsFromAPI } = productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const selectCategories = (state) => state.product.categories;
export const selectLoading = (state) => state.product.loading;
export const selectProductById = (state, id) =>
  state.product.products.find(product => product.id == id);

export default productSlice.reducer;
