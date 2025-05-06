import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: true,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, setLoading, setError, logout } = userSlice.actions;

export default userSlice.reducer;

// Selector functions
export const selectCurrentUser = (state) => state.user.user;
export const selectIsUserLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;