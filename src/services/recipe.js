import { api } from '../redux/auth/operation.js';

export const fetchRecipeById = recipeId => {
  console.log('api token get ', api.defaults.headers.common.Authorization);
  return api
    .get(`/recipes/${recipeId}`)
    .then(({ data }) => {
      return data ? data.data : data;
    })
    .catch(err => console.log(err.message));
};
