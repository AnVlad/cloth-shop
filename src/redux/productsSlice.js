import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db, productsRef } from '../firebase/utils';
import { addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

const initialState = [];

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async ({ name, image, price, category, uid }) => {
    const createdDate = new Date().getTime();
    const adminUserUID = uid;

    const newProduct = {
      name,
      image,
      price,
      category,
      createdDate,
      adminUserUID,
    };

    const result = await addDoc(productsRef, newProduct);

    return { ...newProduct, id: result.id };
  }
);

export const deleteProductById = createAsyncThunk(
  'products/deleteProduct',
  async ({ id }) => {
    const productRef = doc(db, `products/${id}`);
    await deleteDoc(productRef);

    return id;
  }
);

export const setStartProducts = createAsyncThunk(
  'products/setStartProducts',
  async () => {
    const docsSnap = await getDocs(productsRef);
    return docsSnap.docs.map((snap) => ({ ...snap.data(), id: snap.id }));
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const setProducts = (state, action) => {
      return action.payload;
    };
    const logProducts = (state, action) => {
      console.log(action.payload);
    };
    const handleError = (state, action) => {
      console.log(action.error);
    };
    const addProduct = (state, action) => {
      return [...state, action.payload];
    };
    const deleteProduct = (state, action) => {
      return state.filter((product) => {
        return product.id !== action.payload;
      });
    };

    builder.addCase(createProduct.fulfilled, addProduct);
    builder.addCase(createProduct.rejected, handleError);
    builder.addCase(setStartProducts.fulfilled, setProducts);
    builder.addCase(setStartProducts.rejected, handleError);
    builder.addCase(deleteProductById.fulfilled, deleteProduct);
    builder.addCase(deleteProductById.rejected, handleError);
  },
});

export const { addProduct, setProducts } = productsSlice.actions;
export default productsSlice.reducer;
