import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes, fetchRecipesForQuery } from "../../redux/recipes/operations";
import RecipeList from '../../components/RecipeList/RecipeList';
import SearchRecipes from '../../components/SearchRecipes/SearchRecipes';
import Filters from "../../components/Filters/Filters";
import css from "./HomePage.module.css";

const HomePage = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  // console.log(searchQuery)
  
  const recipes = useSelector(state => state.recipes.items);
  const recipesOnSearch = useSelector(state => state.recipes.itemsOnSearch);
  const total = useSelector((state) => state.recipes.total);
  const page = useSelector((state) => state.recipes.page);

  useEffect(() => {
    dispatch(fetchAllRecipes({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(fetchRecipesForQuery({ page, searchQuery }));
  }, [dispatch, searchQuery, page]);

  return (
    <div>
      <SearchRecipes onSearch={setSearchQuery} />
      <Filters />
       {total && <p className={css.totalRec}>{total} recipes</p>}
      {!total && <p className={css.noResults}>Unfortunately, no results for your search</p>}
      {recipesOnSearch && recipesOnSearch.length > 0
        ? (<RecipeList recipes={recipesOnSearch} total={total} />)
        : (<RecipeList recipes={recipes} total={total} />)}
    </div>
  );
};

export default HomePage;