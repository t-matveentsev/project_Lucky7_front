import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const api = axios.create({
  baseURL: 'https://project-lucky7.onrender.com/api/',
  //baseURL: 'http://localhost:3000/api/',
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
      const { data } = await api.post('/users/signup', body);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (body, thunkAPI) => {
    try {
      const response = await api.post('/auth/login', body);
      const { accessToken, user } = response.data.data; // ← тут ключове

      setAuthHeader(accessToken);
      localStorage.setItem('token', accessToken);

      return { token: accessToken, user };
      // const { data } = await api.post('/auth/login', body);
      // console.log('LOGIN RESPONSE:', data);
      // setAuthHeader(data.token);
      // console.log(data);
      // return data;

      // const { data } = await api.post('/auth/login', body);
      //   setAuthHeader(data.token);               // додаємо токен в заголовок axios
      //   localStorage.setItem('token', data.token); // ✅ тут зберігаємо токен у localStorage
      //   return data;
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

export const refreshUser = createAsyncThunk(
  // 'users',
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const savedToken = thunkAPI.getState().auth.token;
      if (!savedToken) return thunkAPI.rejectWithValue('Token is not exist!');
      setAuthHeader(savedToken);
      // const { data } = await api.get('/users');
      const { data } = await api.get('/auth/refresh');
      console.log(data.data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
