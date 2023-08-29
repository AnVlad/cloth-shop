import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import authUserSlice from './authUserSlice';

export const store = configureStore({
  reducer: {
    currentUser: userSlice,
    authUser: authUserSlice,
  },
});
