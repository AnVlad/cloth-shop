import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import modalSlice from './modalSlice';
import productsSlice from './productsSlice';
import individualProducts from './individualProducts';

export const store = configureStore({
  reducer: {
    currentUser: userSlice,
    modalState: modalSlice,
    products: productsSlice,
    individualProducts: individualProducts,
  },
});
