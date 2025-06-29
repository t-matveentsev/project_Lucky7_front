import { configureStore } from "@reduxjs/toolkit";
import { recipesReducer } from "./recipes/slice";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    // Add other reducers here as needed
  },
});
