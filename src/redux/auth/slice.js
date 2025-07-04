import { createSlice } from '@reduxjs/toolkit';
import {
  loginThunk,
  logoutThunk,
  refreshUser,
  registerThunk,
} from './operation';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  token: '',
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder

      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user || { name: '', email: '' };
        state.token = action.payload.token || '';
        state.isLoggedIn = !!action.payload.token;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user || { name: '', email: '' };
        state.token = action.payload.accessToken || '';
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(logoutThunk.fulfilled, () => initialState);
  },
});

export const authReducer = slice.reducer;
