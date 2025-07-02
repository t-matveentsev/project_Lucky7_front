export default function RecipeIngredientsList({
  ingredients,
  onIngredientDeleted,
}) {
  return (
    <div>
      <div>
        <div>Name:</div>
        <div>Amount:</div>
      </div>

      {ingredients.length > 0 &&
        ingredients.map((ingr, index) => (
          <div key={ingr.tmpId}>
            <div>{ingr.name}</div>
            <div>{ingr.amount}</div>
            <button onClick={() => onIngredientDeleted(index)}>🗑️</button>
          </div>
        ))}
    </div>
  );
}
