import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const modalSlice = createSlice({
  name: 'modalState',
  initialState,
  reducers: {
    showModal: () => {
      return true;
    },
    closeModal: () => {
      return false;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
