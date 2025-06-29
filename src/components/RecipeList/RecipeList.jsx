import allRecipes from "../../../recipes.json";
import RecipeCard from "../RecipeCard/RecipeCard";
import css from "./RecipeList.module.css";

const RecipeList = ({ recipes }) => {
  const listToRender = recipes || allRecipes;
  return (
    <ul className={css.list}>
      {listToRender.map((recipe) => (
        <li key={recipe._id.$oid} className={css.item}>
          <RecipeCard data={recipe} />
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;