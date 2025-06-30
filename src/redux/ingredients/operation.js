import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://project-lucky7.onrender.com/api/',
});

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
