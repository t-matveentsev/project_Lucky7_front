import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../auth/operation';

export const fetchRecipesByType = createAsyncThunk(
  'recipes/fetchByType',
  async ({ type, page = 1 }, thunkAPI) => {
    try {
      const response = await api.get(`/recipes/${type}?page=${page}`);
      console.log('RESPONSE:', response.data);
      return {
        data: response.data.data.data, // ← витягуємо масив рецептів
        isLoadMore: page > 1,
      };
      // return { data: response.data, isLoadMore: page > 1 };
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

export const addFavoriteRecipe = createAsyncThunk(
  'recipes/addFavorite',
  async (recipeId, thunkAPI) => {
    try {
      const response = await api.post(`/recipes/favorites/${recipeId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllRecipes = createAsyncThunk(
  'recipes/fetchAll',
  async ({ page = 1 }, thunkAPI) => {
    try {
      const response = await api.get('/recipes/search', {
        params: { page },
      });
      return {
        results: response.data.results,
        total: response.data.total,
        page,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRecipesForQuery = createAsyncThunk(
  'recipes/fetchQueryRecipes',
  async (
    { searchQuery, pageOnSearch = 1, selectedCategory, selectedIngredient },
    thunkAPI
  ) => {
    try {
      const response = await api.get(
        `/recipes/search?query=${searchQuery}&page=${pageOnSearch}&category=${selectedCategory}&ingredient=${selectedIngredient.toLowerCase()}`
      );

      return {
        results: response.data.results,
        total: response.data.total,
        pageOnSearch,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  'recipes/fetchFavRec',
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`/recipes/favorites`);
      return {
        results: response.data.results,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addRecipe = createAsyncThunk(
  'recipes/addRecipe',
  async (recipe, thunkAPI) => {
    try {
      const response = await api.post('/recipes/own', recipe);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
