import { createSlice } from '@reduxjs/toolkit';
import { fetchCategory } from './operation';

const initialState = {
  category: [],
  requestState: '',
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
        state.requestState = 'fulfilled';
        state.loading = false;
      })
      .addCase(fetchCategory.pending, state => {
        state.requestState = 'pending';
        state.loading = true;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.requestState = 'rejected';
        state.error = action.payload;
      });
  },
});

export const categoryReducer = slice.reducer;
