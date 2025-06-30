import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './ingredients/slice';
import { categoryReducer } from './category/slice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    category: categoryReducer,
  },
});
