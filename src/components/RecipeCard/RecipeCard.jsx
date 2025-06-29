import css from "./RecipeCard.module.css";

const RecipeCard = ({ data: { thumb, time, title, description } }) => {
  
  const handleLearnMore = () => {
    console.log(`Learn more about: ${title}`);
  };

  const handleSave = () => {
    console.log(`Saved recipe: ${title}`);
  };

  return (
    <div className={css.card}>
      <img src={thumb} alt={title} className={css.thumb} />
      <div className={css.content}>
        <h3 className={css.title}>{title}</h3>
        <p className={css.time}>⏱ {time} minutes</p>
        <p className={css.description}>{description}</p>
        <div className={css.actions}>
          <button className={css.learnMore} onClick={handleLearnMore}>
            Learn More
          </button>
          <button className={css.save} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

// --------------------added Haievska-------------------
// import { useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { removeFavoriteRecipe } from '../../redux/recipes/operations';
// import css from './RecipeCard.module.css';
// import { ReactComponent as HeartIcon } from '../../assets/heart.svg'; // або своя іконка

// const RecipeCard = ({ recipe, onRemoveFavorite }) => {
//   const location = useLocation();
//  const dispatch = useDispatch();
//   const isFavoritesPage = location.pathname.includes('favorites');

//   const handleRemoveFavorite = async () => {
  //   try {
  //     await dispatch(removeFavoriteRecipe(recipe._id)).unwrap();
  //     onRemoveFavorite(recipe._id);
  //   } catch (error) {
  //     console.error('Error removing favorite:', error);
  //     // Можна додати toast.error('Failed to remove favorite');
  //   }
  // };

  // const handleLearnMore = () => {
  //   navigate(`/recipe/${recipe._id}`);
  // };


//   return (
//     <div className={css.card}>
//       <img src={recipe.thumb} alt={recipe.title} className={css.image} />

//         <div className={css.info}>
//         <h3 className={css.title}>{recipe.title}</h3>
//         {/* Learn More */}
//         <p className={css.description}>{recipe.description}</p>
//         <p className={css.time}>⏱ {recipe.time} min</p>
//       </div>

//       <div className={css.actions}>
//         <button className={css.learnBtn}>Learn more</button>

//         {isFavorites && (
//           <button
//             className={css.removeBtn}
//             onClick={() => handleRemoveFavorite(recipe._id)}
//             aria-label="Remove from favorites"
//           >
//             <HeartIcon className={css.heartIcon} />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecipeCard;
