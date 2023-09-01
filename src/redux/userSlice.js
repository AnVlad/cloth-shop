import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  auth,
  getUserRef,
  googleProvider,
  handleUserProfile,
} from '../firebase/utils';
import { getDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

const initialState = {
  currentUser: null,
  loading: false,
  errors: [],
};

const getUserData = (result) => {
  const {
    uid,
    email,
    displayName,
    reloadUserInfo: { createdAt },
  } = result.user;

  return { uid, email, displayName, createdAt };
};

export const createUser = createAsyncThunk(
  'authUser/createUser',
  async ({ email, password, displayName }) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    const { user } = result;

    await updateProfile(auth.currentUser, { displayName });

    await handleUserProfile(user);

    return getUserData(result);
  }
);

export const createUserByGoogle = createAsyncThunk(
  'authUser/createUserByGoogle',
  async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return getUserData(result);
  }
);

export const singInUser = createAsyncThunk(
  'authUser/signInUser',
  async ({ email, password }) => {
    const result = await signInWithEmailAndPassword(auth, email, password);

    return getUserData(result);
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

    const updatedUser = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return updatedUser;
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
    clearError: (state) => {
      return { ...state, errors: initialState.errors };
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
      state.errors.push(action.error.message);
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
      .addCase(logoutCurrentUser.rejected, setErrorState);
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
