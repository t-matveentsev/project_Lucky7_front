import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const api = axios.create({
  baseURL: 'https://project-lucky7.onrender.com/api/',
  withCredentials: true,
});

const setAuthHeader = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = ``;
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/register', body);
      setAuthHeader(data.data.accessToken);
      return {
        token: data.data.accessToken,
        user: data.data.user || {},
      };
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
      const { accessToken, user } = data.data;
      setAuthHeader(accessToken);
      return { token: accessToken, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/refresh');
      const { accessToken, user } = data.data;
      setAuthHeader(accessToken);
      return { token: accessToken, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (__, thunkAPI) => {
    try {
      await api.post('/auth/logout');
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
