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
    if (searchQuery && pageOnSearch > 1) {
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
      {!isLoading && searchQuery && recipesOnSearch.length === 0 && (
        <p className={css.noResults}>
          Unfortunately, no results for your search
        </p>
      )}

      {recipesOnSearch && recipesOnSearch.length > 0 ? (
        <RecipeList
          recipes={recipesOnSearch}
          total={total}
          listOnSearch={true}
        />
      ) : (
        <RecipeList recipes={recipes} total={total} />
      )}
    </div>
  );
};

export default HomePage;
