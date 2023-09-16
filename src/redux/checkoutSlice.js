import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const isExist = (state, payload) => {
  return state.find((product) => product.id === payload.id);
};

const increaseQuantityInCart = (state, id) => {
  return [
    ...state.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    ),
  ];
};

const decreaseQuantityInCart = (state, id) => {
  const productToDecrease = state.find((product) => product.id === id);

  if (productToDecrease.quantity <= 1) {
    return deleteFromList(state, id);
  }

  return [
    ...state.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity - 1 }
        : product
    ),
  ];
};

const deleteFromList = (state, id) => {
  return [...state.filter((product) => product.id !== id)];
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (isExist(state, action.payload)) {
        return increaseQuantityInCart(state, action.payload.id);
      }

      return [...state, { ...action.payload, quantity: 1 }];
    },
    deleteFromCart: (state, action) => {
      return deleteFromList(state, action.payload);
    },
    increaseQuantity: (state, action) => {
      return increaseQuantityInCart(state, action.payload);
    },
    decreaseQuantity: (state, action) => {
      return decreaseQuantityInCart(state, action.payload);
    },
  },
});

export const { addToCart, deleteFromCart, increaseQuantity, decreaseQuantity } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
