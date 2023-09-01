import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider, handleUserProfile } from '../firebase/utils';

const initialState = {
  loading: false,
  errors: [],
};

export const createUser = createAsyncThunk(
  'authUser/createUser',
  async ({ email, password, name }) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await handleUserProfile(user, { displayName: name });
  }
);

export const createUserByGoogle = createAsyncThunk(
  'authUser/createUserByGoogle',
  async () => {
    signInWithPopup(auth, googleProvider);
  }
);

export const singInUser = createAsyncThunk(
  'authUser/signInUser',
  async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password);
  }
);

export const resetPassword = createAsyncThunk(
  'authUser/resetPassword',
  async ({ email }) => {
    const actionCodeSettings = {
      url: window.location.href.replace('recovery', 'login'),
    };

    await sendPasswordResetEmail(auth, email, actionCodeSettings);
  }
);

export const authUser = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    clearError: (state) => {
      return { ...state, errors: initialState.errors };
    },
  },
  extraReducers: (builder) => {
    const setLoadingState = (state) => {
      state.loading = true;
    };

    const resetLoadingState = (state) => {
      state.loading = false;
    };

    const setErrorState = (state, action) => {
      state.errors.push(action.error.message);
    };

    builder
      .addCase(createUser.pending, setLoadingState)
      .addCase(createUser.fulfilled, resetLoadingState)
      .addCase(createUser.rejected, setErrorState)
      .addCase(createUserByGoogle.pending, setLoadingState)
      .addCase(createUserByGoogle.fulfilled, resetLoadingState)
      .addCase(createUserByGoogle.rejected, setErrorState)
      .addCase(singInUser.pending, setLoadingState)
      .addCase(singInUser.fulfilled, resetLoadingState)
      .addCase(singInUser.rejected, setErrorState)
      .addCase(resetPassword.pending, setLoadingState)
      .addCase(resetPassword.fulfilled, resetLoadingState)
      .addCase(resetPassword.rejected, setErrorState);
  },
});

export default authUser.reducer;
