import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../auth/operation';

export const fetchRecipesByType = createAsyncThunk(
  'recipes/fetchByType',
  async ({ type, page = 1 }, thunkAPI) => {
    try {
      const response = await api.get(`/recipes/${type}?page=${page}`);
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
      const response = await api.delete(`/recipes/favorites/${recipeId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllRecipes = createAsyncThunk(
  "recipes/fetchAll",
  async ({ page = 1 }, thunkAPI) => {
  try {
    const response = await api.get("/recipes/search", {
      params: { page },
    });
      return {
        results: response.data.results,
        total: response.data.total,
        page,
      };
    } catch (error) { return thunkAPI.rejectWithValue(error.message) }
  })

export const fetchRecipesForQuery = createAsyncThunk(
  "recipes/fetchAll",
  async ({ searchQuery, page = 1 }, thunkAPI) => {
  try {
    const response = await api.get(`/recipes/search?query=${searchQuery}&page=${page}`);
      return {
        results: response.data.results,
        total: response.data.total,
        page,
      };
    } catch (error) { return thunkAPI.rejectWithValue(error.message) }
  })

