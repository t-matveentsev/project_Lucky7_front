// import axios from 'axios';
import allRecipes from "../../../recipes.json";
import { useState } from 'react';
import css from "./searchRecipes.module.css"
import { toast } from 'react-hot-toast';
import RecipeList from "../RecipeList/RecipeList";

const SearchRecipes = () => {
  const [searchQuery, setsearchQuery] = useState('');
  const [recipesOnSearch, setRecipesOnSearch] = useState(null);
  // const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setsearchQuery(event.target.value);
  };

  const triggerSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    
    if (!query) {
      setRecipesOnSearch(null); // reset to all
      return;
    }

    const foundRecipes = allRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query)
    );

    if (foundRecipes.length > 0) {
      setRecipesOnSearch(foundRecipes);
    } else {
      setRecipesOnSearch([]);
      toast('No recipes found for your query.', {
        icon: '😕',
        duration: 3000,
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      triggerSearch();
    }
  };

  const handleClick = () => {
    triggerSearch();
  };

    return (
      <div>
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
        <RecipeList recipes={recipesOnSearch ?? undefined} />
      </div>
    );
  }

export default SearchRecipes