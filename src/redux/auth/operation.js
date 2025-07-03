import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const api = axios.create({
  baseURL: 'https://project-lucky7.onrender.com/api/',
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
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const loginThunk = createAsyncThunk('auth/login', async (body, thunkAPI) => {
//   try {
//     const { data } = await api.post('/users/login', body);
//     setAuthHeader(data.token);
//     return data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/login', body);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
