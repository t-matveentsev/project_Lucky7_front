import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const api = axios.create({
  baseURL: 'https://project-lucky7.onrender.com/api/',
});

export const setAuthHeader = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = ``;
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (body, thunkAPI) => {
    try {
      const response = await api.post('/auth/register', body);
      const { accessToken, refreshToken, sessionId, user } = response.data.data;

      setAuthHeader(accessToken);
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('sessionId', sessionId);

      return { token: accessToken, user };
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Unknown error';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (body, thunkAPI) => {
    try {
      const response = await api.post('/auth/login', body);
      const { accessToken, refreshToken, sessionId, user } = response.data.data;

      setAuthHeader(accessToken);
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('sessionId', sessionId);

      return { token: accessToken, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!sessionId || !refreshToken) {
        return thunkAPI.rejectWithValue('No session or refresh token');
      }

      const response = await api.post('/auth/refresh', {
        sessionId,
        refreshToken,
      });

      const { accessToken, user } = response.data.data;
      setAuthHeader(accessToken);
      localStorage.setItem('token', accessToken);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutThunk = createAsyncThunk('auth/logout', async () => {
  await api.post('/auth/logout');
  clearAuthHeader();

  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('sessionId');
});
