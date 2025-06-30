import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './operation';

const initialState = {
  ingredients: [],
  category: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'ingredients',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.pending, state => {
        state.loading = true;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const ingredientsReducer = slice.reducer;
