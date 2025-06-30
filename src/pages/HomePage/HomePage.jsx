import React from 'react';
import RecipeList from '../../components/RecipeList/RecipeList';
import SearchRecipes from '../../components/SearchRecipes/SearchRecipes';

const HomePage = () => {
  return (
    <div>
      <SearchRecipes />
      {/* <RecipeList /> */}
    </div>
  );
};

export default HomePage;
