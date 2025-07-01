import allRecipes from '../../../recipes.json';
import { useEffect, useState } from 'react';
import css from './searchRecipes.module.css';
import { toast } from 'react-hot-toast';
import RecipeList from '../RecipeList/RecipeList';
import Filters from '../Filters/Filters';

const SearchRecipes = () => {
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [totalRecipes, setTotalRecipes] = useState(null);
  const [page, setPage] = useState();

  const [searchQuery, setSearchQuery] = useState('');
  const [recipesOnSearch, setRecipesOnSearch] = useState(null);

  const handleChange = event => {
    const value = event.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      setRecipesOnSearch(null);
      setTotalRecipes(null);
    }
  };

  const triggerSearch = () => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      setRecipesOnSearch(null);
      setTotalRecipes(foundRecipes.length);
      setTotalRecipes(0);
      return;
    }

    const foundRecipes = allRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query)
    );

    if (foundRecipes.length > 0) {
      setRecipesOnSearch(foundRecipes);
    } else {
      setRecipesOnSearch(null);
      toast('No recipes found for your query.', {
        icon: '😕',
        duration: 3000,
      });
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      triggerSearch();
    }
  };

  const handleClick = () => {
    triggerSearch();
  };

  useEffect(() => {
    if (!recipesOnSearch) {
      setPage(1);
    }
  }, [selectedCategory, selectedIngredient]);

  return (
    <div>
      <div className={css.hero}>
        <h1 className={css.heroHeader}>Plan, Cook, and Share Your Flavors</h1>
        <input
          type="text"
          id="search"
          className={css.input}
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search recipes"
        />
        <button type="button" className={css.button} onClick={handleClick}>
          Search
        </button>
      </div>
      <Filters
        totalRecipes={totalRecipes}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedIngredient={selectedIngredient}
        setSelectedIngredient={setSelectedIngredient}
        setSearchQuery={setSearchQuery}
        setRecipesOnSearch={setRecipesOnSearch}
      />
      {/* {recipesOnSearch && <RecipeList recipes={recipesOnSearch} />} */}
      <RecipeList
        recipes={recipesOnSearch ?? undefined}
        setTotalRecipes={setTotalRecipes}
        totalRecipes={totalRecipes}
        selectedCategory={selectedCategory}
        selectedIngredient={selectedIngredient}
        page={page}
      />
    </div>
  );
};

export default SearchRecipes;
