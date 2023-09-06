import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import modalSlice from './modalSlice';
import productsSlice from './productsSlice';

export const store = configureStore({
  reducer: {
    currentUser: userSlice,
    modalState: modalSlice,
    product: productsSlice,
  },
});
