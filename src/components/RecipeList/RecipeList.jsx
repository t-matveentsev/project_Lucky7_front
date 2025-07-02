import RecipeCard from "../RecipeCard/RecipeCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import css from "./RecipeList.module.css";
import { useDispatch } from "react-redux";
import { nextPage } from "../../redux/recipes/slice"

const RecipeList = ({recipes, total}) => {
  const dispatch = useDispatch();

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  
  const handleLoadMore = () => {
    dispatch(nextPage());
  };

  const hasMore = recipes.length < total;

  return (
    <>
      {/* {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} */}
      {/* {total && <p className={css.totalRec}>{total} recipes</p>} */}
      <ul className={css.list}>
        {recipes.map((recipe) => (
          <li key={recipe._id} className={css.item}>
            <RecipeCard data={recipe} />
          </li>
        ))}
      </ul>
      {hasMore && <LoadMoreBtn onClick={handleLoadMore} />}
    </>
  );
};

export default RecipeList;