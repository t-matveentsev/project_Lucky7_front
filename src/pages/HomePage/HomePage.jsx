import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllRecipes,
  fetchRecipesForQuery,
} from '../../redux/recipes/operations';
import RecipeList from '../../components/RecipeList/RecipeList';
import SearchRecipes from '../../components/SearchRecipes/SearchRecipes';
import Filters from '../../components/Filters/Filters';
import css from './HomePage.module.css';
import { resetSearchResults } from '../../redux/recipes/slice';
import { fetchIngredients } from '../../redux/ingredients/operation';
import { fetchCategory } from '../../redux/category/operation';
import Container from '../../components/Container/Container';

const HomePage = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const recipes = useSelector(state => state.recipes.items);
  const recipesOnSearch = useSelector(state => state.recipes.itemsOnSearch);
  const total = useSelector(state => state.recipes.total);
  const page = useSelector(state => state.recipes.page);
  const pageOnSearch = useSelector(state => state.recipes.pageOnSearch);
  const isLoading = useSelector(state => state.recipes.isLoading);
  const error = useSelector(state => state.recipes.error);

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedIngredient('');
    setSearchQuery('');
    dispatch(resetSearchResults());
    dispatch(fetchAllRecipes({ page: 1 }));
  };

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      dispatch(resetSearchResults());
      dispatch(
        fetchRecipesForQuery({
          pageOnSearch: 1,
          searchQuery,
          selectedIngredient,
          selectedCategory,
        })
      );
    }
  }, [dispatch, searchQuery, selectedCategory, selectedIngredient]);

  useEffect(() => {
    if (!searchQuery && (selectedCategory || selectedIngredient)) {
      dispatch(resetSearchResults());
      dispatch(
        fetchRecipesForQuery({
          pageOnSearch: 1,
          searchQuery: '',
          selectedIngredient,
          selectedCategory,
        })
      );
    }
  }, [dispatch, selectedCategory, selectedIngredient, searchQuery]);

  useEffect(() => {
    const hasFilters = selectedIngredient || selectedCategory;

    if ((searchQuery || hasFilters) && pageOnSearch > 1) {
      dispatch(
        fetchRecipesForQuery({
          pageOnSearch,
          searchQuery,
          selectedIngredient,
          selectedCategory,
        })
      );
    }
  }, [
    dispatch,
    pageOnSearch,
    searchQuery,
    selectedCategory,
    selectedIngredient,
  ]);

  useEffect(() => {
    if (!searchQuery && !selectedCategory && !selectedIngredient) {
      dispatch(fetchAllRecipes({ page }));
    }
  }, [dispatch, page, searchQuery, selectedCategory, selectedIngredient]);

  return (
    <div>
      <SearchRecipes onSearch={setSearchQuery} />
      <Container>
        <div className={css.recipesTitle}>
          {!searchQuery ? (
            <p>Recipes</p>
          ) : (
            <p>{`Search Results for "${searchQuery}"`}</p>
          )}
        </div>
        <Filters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedIngredient={selectedIngredient}
          setSelectedIngredient={setSelectedIngredient}
          handleReset={handleReset}
          total={total}
        />
        {isLoading && <p className={css.loading}>Loading...</p>}
        {error && <p className={css.error}>{error}</p>}
        {!isLoading &&
        recipesOnSearch.length === 0 &&
        (searchQuery || selectedCategory || selectedIngredient) ? (
          <>
            <p className={css.noResults}>
              {searchQuery
                ? 'Unfortunately, no results for your search query'
                : 'Sorry, nothing was found for your search filters'}
            </p>
            <hr className={css.noResultsLine} />
            <button className={css.backButton} onClick={handleReset}>
              Go back to the main list
            </button>
          </>
        ) : (
          <RecipeList
            recipes={
              recipesOnSearch && recipesOnSearch.length > 0
                ? recipesOnSearch
                : recipes
            }
            total={total}
            listOnSearch={recipesOnSearch && recipesOnSearch.length > 0}
          />
        )}
      </Container>
    </div>
  );
};

export default HomePage;
