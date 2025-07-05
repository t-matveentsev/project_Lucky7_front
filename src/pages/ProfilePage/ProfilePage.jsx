import { Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesByType } from '../../redux/recipes/operations';
import {
  selectRecipes,
  selectIsLoading,
  selectHasMore,
} from '../../redux/recipes/selectors';
import RecipeList from '../../components/RecipeList/RecipeList';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import Container from '../../components/Container/Container';
import css from './ProfilePage.module.css';
import ProfileNavigation from '../../components/ProfileNavigation/ProfileNavigation';

const ProfilePage = () => {
  const { recipeType } = useParams();
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const loading = useSelector(selectIsLoading);
  const hasMore = useSelector(selectHasMore);

  useEffect(() => {
    dispatch(fetchRecipesByType(recipeType));
  }, [dispatch, recipeType]);

  return (
    <Container>
    <div className={css.wrapper}>
      <h1 className={css.title}>My profile</h1>
      <ProfileNavigation />
      {loading ? (
        <p>Завантаження...</p> 
      ) : (
        <>
          <RecipeList recipes={recipes} />
          {hasMore && <LoadMoreBtn />}
        </>
      )}
    </div>
    </Container>
    
  );
};

export default ProfilePage;
