import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addProduct: false,
  mobileNav: false,
};

export const modalSlice = createSlice({
  name: 'modalState',
  initialState,
  reducers: {
    showProductModal: (state, action) => {
      return { ...state, addProduct: true };
    },
    closeProductModal: (state, action) => {
      return { ...state, addProduct: false };
    },
    showMobileNavModal: (state, action) => {
      return { ...state, mobileNav: true };
    },
    closeMobileNavModal: (state, action) => {
      return { ...state, mobileNav: false };
    },
  },
});

export const {
  showProductModal,
  closeProductModal,
  showMobileNavModal,
  closeMobileNavModal,
} = modalSlice.actions;
export default modalSlice.reducer;
