import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutThunk } from './operation';

export const api = axios.create({
  baseURL: 'https://project-lucky7.onrender.com/api/',
  withCredentials: true,
});

const setAuthHeader = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization;
};

export const applyInterceptor = store => {
  api.interceptors.request.use(
    config => {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  api.interceptors.response.use(
    res => res,
    async error => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshResponse = await api.post('/auth/refresh');
          const newToken = refreshResponse.data.data.accessToken;

          store.dispatch({ type: 'auth/refresh/fulfilled', payload: newToken });

          setAuthHeader(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (err) {
          store.dispatch(logoutThunk());
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};
export const registerThunk = createAsyncThunk(
  'auth/register',
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/register', body);
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
//export const loginThunk = createAsyncThunk(
// 'auth/login',
// async (body, thunkAPI) => {
//  try {
//   const { data } = await api.post('/auth/login', body);
//   setAuthHeader(data.token);
//   return data;
//  } catch (error) {
//    return thunkAPI.rejectWithValue(error.message);
//   }
//  }
//);
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/login', body);
      const accessToken = data.data.accessToken;
      setAuthHeader(accessToken);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await api.post('/auth/logout');
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/refresh', null, {
        withCredentials: true,
      });

      setAuthHeader(data.data.accessToken);
      return { accessToken: data.data.accessToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
