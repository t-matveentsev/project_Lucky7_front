import RecipeCard from '../RecipeCard/RecipeCard';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import css from './RecipeList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Triangle } from 'react-loader-spinner';
import { nextPage, nextPageOnSearch } from '../../redux/recipes/slice';
import { selectIsLoading } from '../../redux/recipes/selectors';

import s from './RecipeList.module.css';

const RecipeList = ({ recipes, total, listOnSearch }) => {
  const loader = useSelector(selectIsLoading);
  const dispatch = useDispatch();

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
        <div className={s.loader}>
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#9b6c43"
            ariaLabel="triangle-loading"
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
