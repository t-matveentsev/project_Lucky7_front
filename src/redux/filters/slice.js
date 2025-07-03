import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    category: "",
    ingredient: ""
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeCategoryFilter: (state, action) => { state.category = action.payload },
    changeIngredientFilter: (state, action) => { state.ingredient = action.payload },
  }
});

export const { changeCategoryFilter } = filtersSlice.actions
export const { changeIngredientFilter } = filtersSlice.actions

export const filtersReducer = filtersSlice.reducer