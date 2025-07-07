import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRecipeById } from '../../services/recipe.js';
import {
  addFavoriteRecipe,
  removeFavoriteRecipe,
} from '../../redux/recipes/operations.js';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';
import { HashLoader } from 'react-spinners';

import s from './RecipeViewPage.module.css';

const RecipeViewPage = () => {
  const navigate = useNavigate();
  const { recipeId } = useParams();

  const [recipeById, setRecipeById] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    setIsLoading(true);
    fetchRecipeById(recipeId)
      .then(recipe => {
        recipe ? setRecipeById(recipe) : navigate('/not-found');
      })
      .catch(err => console.log(err.message))
      .finally(() => setIsLoading(false));
  }, [recipeId]);

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate('/auth/login');
    } else {
      if (recipeById.isFavorite) {
        dispatch(removeFavoriteRecipe(recipeId));
        setRecipeById(prev => ({ ...prev, isFavorite: false }));
      } else {
        dispatch(addFavoriteRecipe(recipeId));
        setRecipeById(prev => ({ ...prev, isFavorite: true }));
      }
    }
  };

  return (
    <div>
      {isLoading && (
        <div className={s.loader}>
          <HashLoader
            color={'#9B6C43'}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <RecipeDetails recipe={recipeById} handleClick={handleClick} />
    </div>
  );
};

export default RecipeViewPage;
