import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../redux/ingredients/operation';
import {
  selectError,
  selectIngredients,
  selectLoading,
} from '../../redux/ingredients/selectors';
import { selectCategory } from '../../redux/category/selectors';
import { fetchCategory } from '../../redux/category/operation';

const Filters = () => {
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const category = useSelector(selectCategory);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleReset = () => {
    setSelectedIngredient('');
    setSelectedCategory('');
  };

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <div>
      <p>count recipes</p>
      <button onClick={() => handleReset()}>reset filters</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <select
        value={selectedIngredient}
        onChange={e => setSelectedIngredient(e.target.value)}
      >
        <option value="">Ingredient</option>
        {Array.isArray(ingredients) &&
          ingredients.map(({ _id, name }) => (
            <option key={_id} value={name}>
              {name}
            </option>
          ))}
      </select>
      <select
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
      >
        <option value="">Category</option>
        {Array.isArray(category) &&
          category.map(({ _id, name }) => (
            <option key={_id} value={name}>
              {name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Filters;
