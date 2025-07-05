import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../auth/operation';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, thunkApi) => {
    try {
      const { data } = await api.get('/ingredients');
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
