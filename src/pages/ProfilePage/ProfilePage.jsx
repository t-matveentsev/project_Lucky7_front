import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRecipesByType,
  fetchFavorites,
} from '../../redux/recipes/operations';
import {
  selectRecipes,
  selectIsLoading,
  selectHasMore,
} from '../../redux/recipes/selectors';
import { selectFavorites } from '../../redux/recipes/selectors';
import { selectToken } from '../../redux/auth/selectors';
import RecipeList from '../../components/RecipeList/RecipeList';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import Container from '../../components/Container/Container';
import css from './ProfilePage.module.css';
import ProfileNavigation from '../../components/ProfileNavigation/ProfileNavigation';
import { HashLoader } from 'react-spinners';

const ProfilePage = () => {
  const { recipeType } = useParams();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const recipes = useSelector(selectRecipes);
  const favorites = useSelector(selectFavorites);
  const loading = useSelector(selectIsLoading);
  const hasMore = useSelector(selectHasMore);
  const isSaved = recipeType === 'favorites';
  const recipeToShow = isSaved ? favorites : recipes;

  const total = Array.isArray(recipeToShow) ? recipeToShow.length : 0;

  useEffect(() => {
    if (!token) return;
    if (isSaved) {
      dispatch(fetchFavorites());
    } else {
      dispatch(fetchRecipesByType({ type: recipeType }));
    }
  }, [dispatch, recipeType, isSaved, token]);

  return (
    <Container>
      <div className={css.wrapper}>
        <h1 className={css.title}>My profile</h1>
        <ProfileNavigation recipeType={recipeType} />
        <p className={css.totalText}>{total} recipes</p>
        {loading && (
          <div className={css.loader}>
            <HashLoader
              color={'#9B6C43'}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        <RecipeList recipes={Array.isArray(recipeToShow) ? recipeToShow : []} />
        {!loading && !isSaved && hasMore && <LoadMoreBtn />}
      </div>
    </Container>
  );
};

export default ProfilePage;
