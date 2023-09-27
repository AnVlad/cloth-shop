import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

import {
  auth,
  db,
  getUserRef,
  googleProvider,
  handleUserProfile,
} from '../firebase/utils';

const initialState = {
  currentUser: null,
  loading: false,
  errors: [],
};

export const createUser = createAsyncThunk(
  'authUser/createUser',
  async ({ email, password, displayName }) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser, { displayName });

    const docSnap = await handleUserProfile(user);

    const userData = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return userData;
  }
);

export const updateUserData = createAsyncThunk(
  'authUser/updateUserData',
  async ({ newData, uid }) => {
    const userDocRef = doc(db, `users/${uid}`);

    await setDoc(userDocRef, newData, { merge: true });

    return newData;
  }
);

export const createUserByGoogle = createAsyncThunk(
  'authUser/createUserByGoogle',
  async () => {
    const { user } = await signInWithPopup(auth, googleProvider);

    const docSnap = await handleUserProfile(user);

    const userData = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return userData;
  }
);

export const singInUser = createAsyncThunk(
  'authUser/signInUser',
  async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    const docSnap = await handleUserProfile(user);

    const userData = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return userData;
  }
);

export const resetPassword = createAsyncThunk(
  'authUser/resetPassword',
  async ({ email }) => {
    const actionCodeSettings = {
      url: window.location.href.replace('recovery', 'login'),
    };

    await sendPasswordResetEmail(auth, email, actionCodeSettings);

    return initialState;
  }
);

export const checkUserAuth = createAsyncThunk(
  'currentUser/checkUserAuth',
  async () => {
    const userRef = await getUserRef();

    const docSnap = await getDoc(userRef);

    const userData = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return userData;
  }
);

export const logoutCurrentUser = createAsyncThunk(
  'currentUser/logoutCurrentUser',
  async () => {
    auth.signOut();
    return initialState;
  }
);

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      return (state.currentUser = action.payload);
    },
    clearErrors: (state) => {
      state.errors = [...initialState.errors];
    },
    deleteError: (state, action) => {
      state.errors = [
        ...state.errors.filter((error, index) => index !== action.payload),
      ];
    },
  },
  extraReducers: (builder) => {
    const setLoadingState = (state) => {
      state.loading = true;
    };

    const resetState = (state, action) => {
      return action.payload;
    };

    const setUser = (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    };

    const setErrorState = (state, action) => {
      state.loading = false;
      state.errors.push(action.error.message);
    };

    const updateCurrentUser = (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    };

    builder
      .addCase(createUser.pending, setLoadingState)
      .addCase(createUser.fulfilled, setUser)
      .addCase(createUser.rejected, setErrorState)

      .addCase(createUserByGoogle.pending, setLoadingState)
      .addCase(createUserByGoogle.fulfilled, setUser)
      .addCase(createUserByGoogle.rejected, setErrorState)

      .addCase(singInUser.pending, setLoadingState)
      .addCase(singInUser.fulfilled, setUser)
      .addCase(singInUser.rejected, setErrorState)

      .addCase(resetPassword.pending, setLoadingState)
      .addCase(resetPassword.fulfilled, resetState)
      .addCase(resetPassword.rejected, setErrorState)

      .addCase(checkUserAuth.pending, setLoadingState)
      .addCase(checkUserAuth.fulfilled, setUser)
      .addCase(checkUserAuth.rejected, setErrorState)

      .addCase(logoutCurrentUser.pending, setLoadingState)
      .addCase(logoutCurrentUser.fulfilled, resetState)
      .addCase(logoutCurrentUser.rejected, setErrorState)

      .addCase(updateUserData.fulfilled, updateCurrentUser)
      .addCase(updateUserData.rejected, setErrorState);
  },
});

export const { setCurrentUser, clearErrors, deleteError } = userSlice.actions;
export default userSlice.reducer;
