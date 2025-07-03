import css from './RecipeDetails.module.css';
import Container from '../Container/Container.jsx';

const RecipeDetails = ({ recipe }) => {
  console.log('!!!', recipe);
  return (
    <Container>
      <div>
        <div>
          <img className={css.image} src={recipe?.thumb} alt={recipe?.title} />
          <h1 className={css.title}>{recipe?.title}</h1>
        </div>
        <div className={css.general}>
          <h2 className={css.generalTitle}>General information</h2>
          <ul>
            <li className={css.generalList}>
              <h3 className={css.generalListTitle}>Category:</h3>{' '}
              <p className={css.generalListContent}>{recipe?.category}</p>
            </li>
            <li className={css.generalList}>
              <h3 className={css.generalListTitle}>Cooking time:</h3>{' '}
              <p className={css.generalListContent}>{recipe?.time}</p>
            </li>
            <li className={css.generalList}>
              <h3 className={css.generalListTitle}>Caloric content:</h3>
              <p className={css.generalListContent}>{recipe?.calories}</p>
            </li>
          </ul>
        </div>
        <button className={css.button} type="button">
          Save
        </button>
      </div>
      <div>
        <h2 className={css.aboutTitle}>About recipe</h2>
        <p className={css.aboutContent}>{recipe?.description}</p>
      </div>
      <div>
        <h2 className={css.ingredientsTitle}>Ingredients:</h2>
        <ul className={css.ingredientsList}>
          {Array.isArray(recipe?.ingredients) &&
            recipe?.ingredients.map(({ name, measure }) => (
              <li className={css.ingredientsListItem}>
                <span> • </span>
                <span>{name}</span>
                <span> — </span>
                <span>{measure}</span>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h2 className={css.preparationTitle}>Preparation Steps:</h2>
        <p className={css.preparationContent}>{recipe?.instructions}</p>
      </div>
    </Container>
  );
};

export default RecipeDetails;
