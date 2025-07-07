import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIngredients } from '../../redux/ingredients/selectors';
import { selectCategory } from '../../redux/category/selectors';
import s from './Filters.module.css';

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

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={s.filterWrapper}>
      <p>{total} recipes</p>

      <div className={s.inlineFilters}>
        <button className={s.resetButton} onClick={handleReset}>
          Reset Filters
        </button>

        <select
          className={s.select}
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
          className={s.select}
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

      <div className={s.dropdownContainer} ref={dropdownRef}>
        <button
          className={s.dropdownBtn}
          onClick={() => setIsOpen(prev => !prev)}
        >
          Filters
          <svg className={s.filterIcon} width="24" height="24">
            <use href="#filter-icon" />
          </svg>
        </button>

        {isOpen && (
          <div className={s.dropdownContent}>
            <button
              className={s.resetButton}
              onClick={() => {
                handleReset();
                setIsOpen(false);
              }}
            >
              Reset Filters
            </button>

            <select
              className={s.select}
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
              className={s.select}
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
        )}
      </div>
    </div>
  );
};

export default Filters;
