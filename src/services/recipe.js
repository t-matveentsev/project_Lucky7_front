import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://project-lucky7.onrender.com/api/',
  //baseURL: 'http://localhost:3000/api/',
});

export const fetchRecipeById = recipeId => {
  return api
    .get(`/recipes/${recipeId}`)
    .then(({ data }) => {
      console.log('data ', data);

      return data ? data.data : data;
    })
    .catch(err => console.log(err.message));
};
