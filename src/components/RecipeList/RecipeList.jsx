import { useState, useEffect } from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import css from './RecipeList.module.css';
import axios from 'axios';

const RecipeList = ({ recipes, setTotalRecipes, totalRecipes }) => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const LIMIT = 12;

  const fetchRecipes = async (pageToFetch = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://project-lucky7.onrender.com/api/recipes/search?page=${pageToFetch}&limit=${LIMIT}`
      );

      if (pageToFetch === 1) {
        setAllRecipes(response.data.results);
      } else {
        setAllRecipes(prev => [...prev, ...response.data.results]);
      }
      setTotalRecipes?.(response.data.total);
      setError(null);
    } catch (err) {
      setError('Failed to load recipes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!recipes) {
      fetchRecipes(page);
    }
  }, [recipes, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const listToRender = recipes || allRecipes;

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul className={css.list}>
        {listToRender.map(recipe => (
          <li key={recipe._id?.$oid || recipe._id} className={css.item}>
            <RecipeCard data={recipe} />
          </li>
        ))}
      </ul>

      {!loading && !recipes && listToRender.length < totalRecipes && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </>
  );
};

export default RecipeList;
