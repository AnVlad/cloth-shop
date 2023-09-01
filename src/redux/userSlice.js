import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, handleUserProfile } from '../firebase/utils';
import { getDoc } from 'firebase/firestore';

const initialState = null;

export const checkUserAuth = createAsyncThunk(
  'currentUser/checkUserAuth',
  async () => {
    const currentUser = await getCurrentUser();
    const userRef = await handleUserProfile(currentUser);

    const docSnap = await getDoc(userRef);

    const {
      createdDate: { seconds, nanoseconds },
    } = docSnap.data();

    const updatedUser = {
      id: docSnap.id,
      ...docSnap.data(),
      createdDate: { seconds, nanoseconds },
    };

    return updatedUser;
  }
);

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkUserAuth.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setCurrentUser, loggedUser } = userSlice.actions;
export default userSlice.reducer;
