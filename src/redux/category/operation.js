import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../auth/operation';

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async (_, thunkApi) => {
    try {
      const { data } = await api.get('/categories');
      console.log(data.data);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
