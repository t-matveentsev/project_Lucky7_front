import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes, fetchRecipesForQuery } from "../../redux/recipes/operations";
import RecipeList from '../../components/RecipeList/RecipeList';
import SearchRecipes from '../../components/SearchRecipes/SearchRecipes';
import Filters from "../../components/Filters/Filters";
import css from "./HomePage.module.css";
import { resetSearchResults } from "../../redux/recipes/slice"

const HomePage = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  // console.log(searchQuery)
  
  const recipes = useSelector(state => state.recipes.items);
  const recipesOnSearch = useSelector(state => state.recipes.itemsOnSearch);
  const total = useSelector((state) => state.recipes.total);
  const page = useSelector((state) => state.recipes.page);
  const pageOnSearch = useSelector((state) => state.recipes.pageOnSearch);
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const error = useSelector((state) => state.recipes.error);

  useEffect(() => {
    if (searchQuery) {
      dispatch(resetSearchResults()); 
      dispatch(fetchRecipesForQuery({ pageOnSearch: 1, searchQuery }));
    }
  }, [dispatch, searchQuery]);
  
  useEffect(() => {
    if (searchQuery && pageOnSearch > 1) {
      dispatch(fetchRecipesForQuery({ pageOnSearch, searchQuery }));
    }
  }, [dispatch, pageOnSearch, searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      dispatch(fetchAllRecipes({ page }));
    }
  }, [dispatch, page, searchQuery]);
  
  return (
    <div>
      <SearchRecipes onSearch={setSearchQuery} />
      <Filters />
      {isLoading && <p className={css.loading}>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}
      {total > 0 && !isLoading && <p className={css.totalRec}>{total} recipes</p>}
      {!isLoading && searchQuery && recipesOnSearch.length === 0 && <p className={css.noResults}>Unfortunately, no results for your search</p>}
      {recipesOnSearch && recipesOnSearch.length > 0
        ? (<RecipeList recipes={recipesOnSearch} total={total} listOnSearch={true} />)
        : (<RecipeList recipes={recipes} total={total} />)}
    </div>
  );
};

export default HomePage;