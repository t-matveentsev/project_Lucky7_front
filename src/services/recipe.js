import { api } from '../redux/auth/operation.js';

export const fetchRecipeById = recipeId => {
  return api
    .get(`/recipes/${recipeId}`)
    .then(({ data }) => {
      return data ? data.data : data;
    })
    .catch(err => console.log(err.message));
};
