import React from 'react';
import RecipeList from '../../components/RecipeList/RecipeList';
import SearchRecipes from '../../components/SearchRecipes/SearchRecipes';
import Filters from '../../components/Filters/Filters';

const HomePage = () => {
  return (
    <div>
      <Filters />
      <SearchRecipes />
      <RecipeList />
    </div>
  );
};

export default HomePage;
