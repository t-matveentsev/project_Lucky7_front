import { useSelector } from 'react-redux';
import { selectIngredients } from '../../redux/ingredients/selectors';
import { selectCategory } from '../../redux/category/selectors';

const Filters = ({
  selectedIngredient,
  selectedCategory,
  setSelectedIngredient,
  setSelectedCategory,
  handleReset,
  total,
}) => {
  const ingredients = useSelector(selectIngredients);
  const category = useSelector(selectCategory);

  return (
    <div>
      <p>{total} recipes</p>
      <button onClick={() => handleReset()}>reset filters</button>
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
