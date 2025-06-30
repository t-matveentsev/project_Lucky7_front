import { createSlice } from '@reduxjs/toolkit';
import { fetchCategory } from './operation';

const initialState = {
  category: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'category',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategory.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const categoryReducer = slice.reducer;
