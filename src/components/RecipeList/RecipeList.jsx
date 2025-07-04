import RecipeCard from "../RecipeCard/RecipeCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import css from "./RecipeList.module.css";
import { useDispatch } from "react-redux";
import { nextPage, nextPageOnSearch } from "../../redux/recipes/slice"

const RecipeList = ({recipes, total, listOnSearch}) => {
  const dispatch = useDispatch();
  
  const handleLoadMore = () => {
    dispatch(nextPage());
  };
  const handleLoadMoreOnSearch = () => {
    dispatch(nextPageOnSearch());
  };

  const hasMore = recipes.length < total;

  return (
    <>
      <ul className={css.list}>
        {recipes.map((recipe) => (
          <li key={recipe._id} className={css.item}>
            <RecipeCard data={recipe} />
          </li>
        ))}
      </ul>
      {listOnSearch
  ? (hasMore && <LoadMoreBtn onClick={handleLoadMoreOnSearch} />)
  : (hasMore && <LoadMoreBtn onClick={handleLoadMore} />)}
    </>
  );
};

export default RecipeList;