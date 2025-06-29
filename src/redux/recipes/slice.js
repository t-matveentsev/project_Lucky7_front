import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipesByType } from './operations';
import { removeFavoriteRecipe } from './operations';

const initialState = {
  items: [],
  page: 1,
  isLoading: false,
  error: null,
  hasMore: true,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchRecipesByType.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipesByType.fulfilled, (state, action) => {
        const { data, isLoadMore } = action.payload;
        state.isLoading = false;
        state.items = isLoadMore ? [...state.items, ...data] : data;
        state.hasMore = data.length > 6;
      })
      .addCase(fetchRecipesByType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeFavoriteRecipe.fulfilled, (state, action) => {
        const removedId = action.meta.arg;
        state.items = state.items.filter(recipe => recipe._id !== removedId);
})

  },
});

export const recipesReducer = recipesSlice.reducer;
