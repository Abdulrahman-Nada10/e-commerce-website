import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import adminReducer from './slices/adminSlice';

const cartPersistConfig = {
  key: 'cart',
  storage,
};

const wishlistPersistConfig = {
  key: 'wishlist',
  storage,
};

const orderPersistConfig = {
  key: 'order',
  storage,
};

const productPersistConfig = {
  key: 'product',
  storage,
};

const categoryPersistConfig = {
  key: 'category',
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistReducer);
const persistedOrderReducer = persistReducer(orderPersistConfig, orderReducer);
const persistedProductReducer = persistReducer(productPersistConfig, productReducer);
const persistedCategoryReducer = persistReducer(categoryPersistConfig, categoryReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
    order: persistedOrderReducer,
    product: persistedProductReducer,
    category: persistedCategoryReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store);
