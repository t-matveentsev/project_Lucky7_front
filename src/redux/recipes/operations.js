import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipesByType = createAsyncThunk(
  'recipes/fetchByType',
  async ({ type, page = 1 }, thunkAPI) => {
    try {
      const response = await axios.get(`/api/recipes/${type}?page=${page}`);
      return { data: response.data, isLoadMore: page > 1 };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFavoriteRecipe = createAsyncThunk(
  'recipes/removeFavorite',
  async (recipeId, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/recipes/favorites/${recipeId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);