import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes, fetchRecipesForQuery } from "../../redux/recipes/operations";
import RecipeList from '../../components/RecipeList/RecipeList';
import SearchRecipes from '../../components/SearchRecipes/SearchRecipes';
import Filters from "../../components/Filters/Filters";
// import { nextPage } from "../../redux/recipes/slice"

const HomePage = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  // console.log(searchQuery)
  
  const recipes = useSelector(state => state.recipes.items);
  const total = useSelector((state) => state.recipes.total);
  const page = useSelector((state) => state.recipes.page);

  useEffect(() => {
    dispatch(fetchAllRecipes({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(fetchRecipesForQuery({ page, searchQuery }));
  }, [dispatch, searchQuery, page]);
  
  // const hasMore = recipes.length < total;

  return (
    <div>
      <SearchRecipes onSearch={setSearchQuery} />
      <Filters />
      <RecipeList recipes={recipes}
        total={total}
        // hasMore={hasMore}
        // onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default HomePage;