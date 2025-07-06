import { createSlice } from '@reduxjs/toolkit';
import { fetchFavorites, fetchRecipesByType } from './operations';
import { removeFavoriteRecipe } from './operations';
import { fetchAllRecipes, fetchRecipesForQuery } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  items: [],
  itemsOnSearch: [],
  favorites: [],
  total: 0,
  isLoading: false,
  error: null,
  hasMore: true,
  page: 1,
  pageOnSearch: 1,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    nextPage: state => {
      state.page += 1;
    },
    resetPage: state => {
      state.page = 1;
    },
    nextPageOnSearch: state => {
      state.pageOnSearch += 1;
    },
    resetPageOnSearch: state => {
      state.pageOnSearch = 1;
    },
    resetSearchResults: state => {
      state.itemsOnSearch = [];
      state.total = 0;
      state.pageOnSearch = 1;
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
        // state.items = state.items.filter(recipe => recipe._id !== removedId);
        state.favorites = state.favorites.filter(recipe => recipe._id !== removedId);
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

      .addCase(fetchRecipesForQuery.fulfilled, (state, action) => {
        const { results, total, pageOnSearch } = action.payload;

        state.isLoading = false;
        state.total = total;
        state.error = null;

        if (pageOnSearch > 1) {
          state.itemsOnSearch = [...state.itemsOnSearch, ...results];
        } else {
          state.itemsOnSearch = results;
        }
        state.hasMore = state.itemsOnSearch.length < total;
      })
      .addCase(fetchRecipesForQuery.rejected, handleRejected)
      .addCase(fetchRecipesForQuery.pending, handlePending)

      .addCase(fetchFavorites.fulfilled, (state, action) => {
        const { results } = action.payload;
        state.isLoading = false;
        state.error = null;
        state.favorites = results;
      })
      .addCase(fetchFavorites.rejected, state => {
        state.error = null;
      })
      .addCase(fetchFavorites.pending, state => {
        state.isLoading = true;
        state.error = null;
      });
  },
});

export const {
  nextPage,
  resetPage,
  nextPageOnSearch,
  resetPageOnSearch,
  resetSearchResults,
} = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
