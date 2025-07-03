import { NavLink } from 'react-router-dom';
import css from './RecipeCard.module.css';

const RecipeCard = ({ data: { _id, thumb, time, title, description, calories="-" } }) => {

  const handleSave = () => {
    console.log(`Saved recipe: ${title}`);
  };

  return (
    <div className={css.card}>
      <img src={thumb} alt={title} className={css.thumb} />
      <h3 className={css.title}>{title}</h3>
      <p className={css.time}>⏱ {time} minutes</p>
      <p className={css.description}>{description}</p>
      <p className={css.calories}>~{calories} cals</p>
      <div className={css.actions}>
        <div className={css.btnsWrapper}>
        <button className={css.learnMore}>
          <NavLink to={`/recipes/${_id}`} className={css.navLink}>
              Learn More
            </NavLink>
            </button>
          <button className={css.save} onClick={handleSave}>
            <svg className='css.saveBtnIcon' width="24" height="24">
              <use href="/icons.svg#icon-save-icon"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
