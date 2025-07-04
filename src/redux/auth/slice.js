import { createSlice } from '@reduxjs/toolkit';
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
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

      .addCase(refreshThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshThunk.rejected, state => {
        state.isRefreshing = false;
        state.token = '';
        state.isLoggedIn = false;
      })

      .addCase(logoutThunk.fulfilled, () => initialState);
  },
});

export const authReducer = slice.reducer;
