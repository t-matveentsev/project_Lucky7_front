import { useState, useEffect } from "react";
// import allRecipes from "../../../recipes.json";
import RecipeCard from "../RecipeCard/RecipeCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import css from "./RecipeList.module.css";
import axios from "axios";

const RecipeList = ({ recipes }) => {

  const [allRecipes, setAllRecipes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://project-lucky7.onrender.com/api/recipes/search"
        );
        setAllRecipes(response.data.results);
        setError(null);
      } catch (err) {
        setError("Failed to load recipes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  if (!recipes) {
      fetchRecipes();
    }
  }, [recipes]);  

  const listToRender = recipes || allRecipes;
  const visibleRecipes = listToRender.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    <ul className={css.list}>
      {visibleRecipes.map((recipe) => (
        <li key={recipe._id.$oid || recipe._id} className={css.item}>
          <RecipeCard data={recipe} />
        </li>
      ))}
    </ul>
    {!loading && visibleCount < listToRender.length && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </>);
};

export default RecipeList;