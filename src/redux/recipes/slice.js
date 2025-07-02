import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipesByType } from './operations';
import { removeFavoriteRecipe } from './operations';
import { fetchAllRecipes } from './operations';

const handlePending = (state) => {
  state.loading = true
}

const handleRejected = (state, action) => {
  state.loading = false
  state.error = action.payload
}

const initialState = {
  items: [],
  total: 0,
  isLoading: false,
  error: null,
  hasMore: true,
  page: 1, 
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    filterBySearchQuery: (state, action) => {
      const query = action.payload.trim().toLowerCase();
      if (!query) return;
      const filtered = state.items.filter(recipe =>
        recipe.title.toLowerCase().includes(query));
      state.items = filtered;
      state.total = filtered.length;
      state.page = 1;
    },

    nextPage: (state) => {
      state.page += 1;
    },
    resetPage: (state) => {
      state.page = 1;
    },
  },
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
      
      
.addCase(fetchAllRecipes.fulfilled, (state, action) => {
  const { results, total, page } = action.payload;

  state.isLoading = false;
  state.total = total;
  state.error = null;

  if (page > 1) {
    state.items = [...state.items, ...results];
  } else {
    state.items = results;
  }

  state.hasMore = state.items.length < total;
})
.addCase(fetchAllRecipes.rejected, handleRejected)
.addCase(fetchAllRecipes.pending, handlePending)
  },
});

export const { nextPage, resetPage, filterBySearchQuery } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
