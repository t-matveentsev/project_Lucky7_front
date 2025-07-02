import { useState } from 'react';
import css from './SearchRecipes.module.css';
import { toast } from 'react-hot-toast';

const SearchRecipes = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {

    const rawQuery = inputValue.trim().toLowerCase();
    
    if (!rawQuery) {
      toast('Your query must be some part a recipe title.', {
        icon: '🔍',
        duration: 3000,
      });
      onSearch('');
      return;
    }

    const isValidLength = rawQuery.length >= 2;
    if (!isValidLength) {
      toast('Search term must be at least 2 characters.', {
        icon: '⚠️',
        duration: 3000,
      });
      return;
    }
  
    const isValidString = typeof rawQuery === 'string' && /^[a-zA-Z0-9\s\-_]+$/.test(rawQuery);
    if (!isValidString) {
      toast('Recipe title must only contain letters, numbers, spaces, hyphens, or underscores.', {
        icon: '🚫',
        duration: 3000,
      });
      return;
    }
  
    const query = rawQuery.replace(/[-_]/g, '').toLowerCase();

    onSearch(query);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

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
