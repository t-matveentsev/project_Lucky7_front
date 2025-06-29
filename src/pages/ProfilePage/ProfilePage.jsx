import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesByType } from '../../redux/recipes/operations';
import { selectRecipes, selectLoading, selectHasMore } from '../../redux/recipes/selectors';
import ProfileNavigation from 'components/ProfileNavigation/ProfileNavigation';
import RecipesList from 'components/RecipesList/RecipesList';
import LoadMoreBtn from 'components/LoadMoreBtn/LoadMoreBtn';

import css from './ProfilePage.module.css';

const ProfilePage = () => {
  const { recipeType } = useParams();
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const loading = useSelector(selectLoading);
  const hasMore = useSelector(selectHasMore);

  useEffect(() => {
    dispatch(fetchRecipesByType(recipeType));
  }, [dispatch, recipeType]);

  return (
    <div className={css.wrapper}>
        <h1 className={css.title}>My profile</h1>
      <ProfileNavigation />
      {loading ? <p>Завантаження...</p> : <RecipesList recipes={recipes} />}
      {/* Кнопка Load More */}
      {!loading && (
        <>
          <RecipesList recipes={recipes} />
          {hasMore && <LoadMoreBtn />}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
