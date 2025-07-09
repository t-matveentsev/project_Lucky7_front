import { NavLink } from 'react-router-dom';
import css from './RecipeCard.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  addFavoriteRecipe,
  removeFavoriteRecipe,
} from '../../redux/recipes/operations';
import { useEffect, useState } from 'react';

const RecipeCard = ({
  data: { _id, thumb, time, title, description, calories = '-' },
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthorized = useSelector(state => state.auth.isLoggedIn);
  const favorites = useSelector(state => state.recipes.favorites);

  const [isRecipeFavorite, setIsRecipeFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const found = favorites.some(fav => fav._id === _id);
    setIsRecipeFavorite(found);
  }, [favorites, _id]);
  const handleClick = () => {
    if (isAuthorized) {
      if (isRecipeFavorite) {
        dispatch(removeFavoriteRecipe(_id));
        setIsRecipeFavorite(false);
      } else {
        dispatch(addFavoriteRecipe(_id));
        setIsRecipeFavorite(true);
      }
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <div className={css.card}>
      <img src={thumb} alt={title} className={css.thumb} />
      <div className={css.titleTimeWrapper}>
      <h3 className={css.title}>{title}</h3>
      <div className={css.timeWrapper}>
      <svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 7.61537V12.5481L15.7885 15.2884M19.625 12C19.625 15.935 16.435 19.125 12.5 19.125C8.56497 19.125 5.375 15.935 5.375 12C5.375 8.06497 8.56497 4.875 12.5 4.875C16.435 4.875 19.625 8.06497 19.625 12Z" stroke="black" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> 
      <p className={css.time}>{time} </p>
      </div>
      </div>
      <p className={css.description}>{description}</p>
      <p className={css.calories}>~{calories} cals</p>
      <div className={css.actions}>
        <div className={css.btnsWrapper}>
          <NavLink className={css.learnMore} to={`/recipes/${_id}`}>
            <button className={css.learnMoreBtn}>Learn More</button>
          </NavLink>
          <button
            className={css.save}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isAuthorized && isRecipeFavorite ? (
              isHovered ? (
                <svg
                  className="css.saveBtnIcon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 6h14M10 11v6M14 11v6M6 6l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  className="css.saveBtnIcon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9971 3.5C13.5127 3.50001 14.8786 3.67394 15.8584 3.8457C16.6903 3.9916 17.3397 4.5567 17.5498 5.34277C17.9004 6.65504 18.304 8.87073 18.2441 11.9902C18.1778 15.4445 17.6121 17.8033 17.1396 19.1914C17.0568 19.4345 16.8855 19.5548 16.6943 19.585C16.4923 19.6167 16.2403 19.5493 16.0352 19.3389C15.4376 18.7256 14.6944 18.0001 13.998 17.4248C13.6508 17.138 13.3037 16.8793 12.9844 16.6895C12.6854 16.5118 12.3332 16.3457 11.9971 16.3457C11.6673 16.3457 11.3018 16.5069 10.9824 16.6816C10.6397 16.8692 10.2571 17.1264 9.86816 17.4131C9.0886 17.9877 8.23902 18.7133 7.55176 19.3262C7.32464 19.5285 7.05894 19.5745 6.85156 19.5205C6.65318 19.4688 6.48216 19.3213 6.42188 19.0547C6.10188 17.6365 5.75 15.321 5.75 12C5.75 8.73654 6.13205 6.56481 6.45996 5.30273C6.65768 4.54211 7.28508 3.99622 8.0957 3.85254C9.07802 3.67853 10.4607 3.5 11.9971 3.5Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )
            ) : (
              <svg
                className="css.saveBtnIcon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9971 3.5C13.5127 3.50001 14.8786 3.67394 15.8584 3.8457C16.6903 3.9916 17.3397 4.5567 17.5498 5.34277C17.9004 6.65504 18.304 8.87073 18.2441 11.9902C18.1778 15.4445 17.6121 17.8033 17.1396 19.1914C17.0568 19.4345 16.8855 19.5548 16.6943 19.585C16.4923 19.6167 16.2403 19.5493 16.0352 19.3389C15.4376 18.7256 14.6944 18.0001 13.998 17.4248C13.6508 17.138 13.3037 16.8793 12.9844 16.6895C12.6854 16.5118 12.3332 16.3457 11.9971 16.3457C11.6673 16.3457 11.3018 16.5069 10.9824 16.6816C10.6397 16.8692 10.2571 17.1264 9.86816 17.4131C9.0886 17.9877 8.23902 18.7133 7.55176 19.3262C7.32464 19.5285 7.05894 19.5745 6.85156 19.5205C6.65318 19.4688 6.48216 19.3213 6.42188 19.0547C6.10188 17.6365 5.75 15.321 5.75 12C5.75 8.73654 6.13205 6.56481 6.45996 5.30273C6.65768 4.54211 7.28508 3.99622 8.0957 3.85254C9.07802 3.67853 10.4607 3.5 11.9971 3.5Z"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
