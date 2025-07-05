import { createSlice } from '@reduxjs/toolkit';
import {
  registerThunk,
  loginThunk,
  refreshThunk,
  logoutThunk,
} from './operation';

const initialState = {
  user: { name: '', email: '' },
  token: '',
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder

      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.isLoggedIn = true;
      })

      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.isLoggedIn = true;
      })

      .addCase(refreshThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshThunk.rejected, state => {
        state.isRefreshing = false;
        state.token = '';
        state.user = { name: '', email: '' };
        state.isLoggedIn = false;
      })

      .addCase(logoutThunk.fulfilled, () => initialState);
  },
});

export const authReducer = authSlice.reducer;
