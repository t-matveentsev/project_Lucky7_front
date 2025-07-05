import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRecipeById } from '../../services/recipe.js';

import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';

const RecipeViewPage = () => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  console.log('recipe id ', recipeId);

  const [recipeById, setRecipeById] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  return isLoading ? (
    <p>Завантаження...</p>
  ) : (
    <RecipeDetails recipe={recipeById} />
  );
};

export default RecipeViewPage;
