import { useState } from "react";
import allRecipes from "../../../recipes.json";
import RecipeCard from "../RecipeCard/RecipeCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import css from "./RecipeList.module.css";

const RecipeList = ({ recipes }) => {
  const listToRender = recipes || allRecipes;

  const [visibleCount, setVisibleCount] = useState(12);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  const visibleRecipes = listToRender.slice(0, visibleCount);

  return (
    <>
    <ul className={css.list}>
      {visibleRecipes.map((recipe) => (
        <li key={recipe._id.$oid} className={css.item}>
          <RecipeCard data={recipe} />
        </li>
      ))}
    </ul>
    {visibleCount < listToRender.length && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </>);
};

export default RecipeList;