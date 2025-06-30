import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../auth/operation';

export const fetchData = createAsyncThunk(
  'ingredients/fetchData',
  async (_, thunkApi) => {
    try {
      const { data } = await api.get('/ingredients');
      console.log(data.data);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
