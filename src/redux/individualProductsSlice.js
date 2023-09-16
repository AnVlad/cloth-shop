import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/utils';

const initialState = [];

export const addIndividualProduct = createAsyncThunk(
  'individualProducts/addIndividualProduct',
  async ({ id }) => {
    const productRef = doc(db, `products/${id}`);

    const docSnap = await getDoc(productRef);
    return {
      ...docSnap.data(),
      id: docSnap.id,
    };
  }
);

export const individualProducts = createSlice({
  name: 'individualProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const addToList = (state, action) => {
      const docExistInList = state.find((product) => {
        return product.id === action.payload.id;
      });

      if (!docExistInList) return [...state, action.payload];
      return state;
    };

    const log = (state, action) => {
      console.log(action.error);
    };

    builder
      .addCase(addIndividualProduct.fulfilled, addToList)

      .addCase(addIndividualProduct.rejected, log);
  },
});

// export const { addIndividualProduct } = individualProducts.actions;
export default individualProducts.reducer;
