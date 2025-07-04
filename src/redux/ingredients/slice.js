import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from './operation';

const initialState = {
  ingredients: [],
};

const slice = createSlice({
  name: 'ingredients',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(fetchIngredients.pending, state => {
        state.loading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const ingredientsReducer = slice.reducer;
