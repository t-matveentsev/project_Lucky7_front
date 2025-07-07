import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const api = axios.create({
  baseURL: '/api/',
  withCredentials: true,
});

export const setAuthHeader = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete api.defaults.headers.common.Authorization;
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/register', body);
      const { accessToken, refreshToken, _id: sessionId, user } = data.data;

      setAuthHeader(accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('sessionId', sessionId);

      return { token: accessToken, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/login', body);
      const { accessToken, refreshToken, _id: sessionId, user } = data.data;

      setAuthHeader(accessToken);
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
        return thunkAPI.rejectWithValue('No sessionId or refreshToken stored');
      }

      const { data } = await api.post('/auth/refresh', {
        sessionId,
        refreshToken,
      });

      const { accessToken, user } = data.data;
      setAuthHeader(accessToken);

      return { token: accessToken, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await api.post('/auth/logout');
      clearAuthHeader();
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('sessionId');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
