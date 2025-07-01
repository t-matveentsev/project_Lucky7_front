export default function RecipeIngredientsList({
  ingredients,
  onIngredientDeleted,
}) {
  return (
    ingredients.length > 0 && (
      <div>
        <div>
          <div>Name:</div>
          <div>Amount:</div>
        </div>

        {ingredients.map((ingr, index) => (
          <div key={ingr.id}>
            <div>{ingr.name}</div>
            <div>{ingr.amount}</div>
            <button onClick={() => onIngredientDeleted(index)}>🗑️</button>
          </div>
        ))}
      </div>
    )
  );
}
