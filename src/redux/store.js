import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

import userSlice from './userSlice';
import modalSlice from './modalSlice';
import productsSlice from './productsSlice';
import individualProductsSlice from './individualProductsSlice';
import checkoutSlice from './checkoutSlice';

const rootReducer = combineReducers({
  currentUser: userSlice,
  modalState: modalSlice,
  products: productsSlice,
  individualProducts: individualProductsSlice,
  checkout: checkoutSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['checkout'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
