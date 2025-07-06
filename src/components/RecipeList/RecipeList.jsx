import RecipeCard from '../RecipeCard/RecipeCard';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import css from './RecipeList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { nextPage, nextPageOnSearch } from '../../redux/recipes/slice';
import { selectIsLoading } from '../../redux/recipes/selectors';
import { fetchFavorites } from '../../redux/recipes/operations';
import { useEffect } from 'react';
import { HashLoader } from 'react-spinners';

const RecipeList = ({ recipes, total, listOnSearch }) => {
  const loader = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(nextPage());
  };
  const handleLoadMoreOnSearch = () => {
    dispatch(nextPageOnSearch());
  };

  const hasMore = recipes.length < total;

  return (
    <div>
      {loader && (
        <div className={css.loader}>
          <HashLoader
            color={'#9B6C43'}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <ul className={css.list}>
        {recipes.map(recipe => (
          <li key={recipe._id} className={css.item}>
            <RecipeCard data={recipe} />
          </li>
        ))}
      </ul>
      {listOnSearch
        ? hasMore && <LoadMoreBtn onClick={handleLoadMoreOnSearch} />
        : hasMore && <LoadMoreBtn onClick={handleLoadMore} />}
    </div>
  );
};

export default RecipeList;
