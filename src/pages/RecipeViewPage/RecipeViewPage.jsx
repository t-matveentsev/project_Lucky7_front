import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRecipeById } from '../../services/recipe.js';
import {
  addFavoriteRecipe,
  removeFavoriteRecipe,
} from '../../redux/recipes/operations.js';

import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';

const RecipeViewPage = () => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  console.log('recipe id ', recipeId);

  const [recipeById, setRecipeById] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    fetchRecipeById(recipeId)
      .then(recipe => {
        recipe ? setRecipeById(recipe) : navigate('/not-found');
        console.log('recipe', recipe);
      })
      .catch(err => console.log(err.message))
      .finally(() => setIsLoading(false));
  }, [recipeId]);

  const handleClick = () => {
    if (recipeById.isFavorite) {
      dispatch(removeFavoriteRecipe(recipeId));
      setRecipeById(prev => ({ ...prev, isFavorite: false }));
    } else {
      dispatch(addFavoriteRecipe(recipeId));
      setRecipeById(prev => ({ ...prev, isFavorite: true }));
    }
  };

  return isLoading ? (
    <p>Завантаження...</p>
  ) : (
    <RecipeDetails recipe={recipeById} handleClick={handleClick} />
  );
};

export default RecipeViewPage;
