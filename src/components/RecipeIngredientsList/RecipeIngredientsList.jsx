import css from './RecipeIngredientsList.module.css';

export default function RecipeIngredientsList({
  ingredients,
  onIngredientDeleted,
}) {
  return (
    <div className={css.wrapper}>
      <div className={css.headerRow}>
        <div className={css.title}>Name:</div>
        <div className={css.title}>Amount:</div>
        <div></div>
      </div>
      {ingredients.length > 0 &&
        ingredients.map((ingr, index) => (
          <div key={ingr.id} className={css.ingredientRow}>
            <div className={css.components}>{ingr.name}</div>
            <div className={css.components}>{ingr.measure}</div>
            <button onClick={() => onIngredientDeleted(index)}>🗑️</button>
          </div>
        ))}
    </div>
  );
}

{
  /* <svg className={css.icon} width="24" height="24" viewBox="0 0 24 24">
  <use href="/icons.svg#icon-trash" />
</svg>; */
}
