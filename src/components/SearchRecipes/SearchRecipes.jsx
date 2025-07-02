import { useState } from 'react';
import css from './SearchRecipes.module.css';
import { toast } from 'react-hot-toast';

const SearchRecipes = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  // const [recipesOnSearch, setRecipesOnSearch] = useState(null);
  // const [loading, setLoading] = useState(false);

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  // console.log(inputValue)

  const handleSearch = () => {
    const query = inputValue.trim().toLowerCase();
    // console.log(query)

    if (!query) {
      toast('Please enter a search term.', {
        icon: '🔍',
        duration: 3000,
      });
      onSearch('');
      return;
    }
    onSearch(query);
  };

  //   if (!query) {
  //     setRecipesOnSearch(null);
  //     return;
  //   }

  //   const foundRecipes = allRecipes.filter(recipe =>
  //     recipe.title.toLowerCase().includes(query)
  //   );

  //   if (foundRecipes.length > 0) {
  //     setRecipesOnSearch(foundRecipes);
  //   } else {
  //     setRecipesOnSearch(null);
  //     toast('No recipes found for your query.', {
  //       icon: '😕',
  //       duration: 3000,
  //     });
  //   }
  // };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  // const handleClick = () => {
  //   triggerSearch();
  // };

  return (
    <div>
      <div className={css.hero}>
        <h1 className={css.heroHeader}>Plan, Cook, and Share Your Flavors</h1>
        <input
          type="text"
          id="search"
          className={css.input}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search recipes"
        />
        <button type="button" className={css.button} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchRecipes;
