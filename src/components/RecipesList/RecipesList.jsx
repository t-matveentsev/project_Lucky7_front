const RecipeList = () => {
  return <div>RecipeList</div>;
};

export default RecipeList;

//------------------added Haievska-------------------

// оновлений з обробкою видалення

// import { useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import RecipeCard from './RecipeCard';
// import css from './RecipesList.module.css';
// import { removeFavoriteRecipe } from '../../redux/recipes/operations';

// const RecipesList = ({ recipes }) => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const isFavorites = location.pathname.includes('favorites');

//   const handleRemoveFavorite = async (id) => {
//     try {
//       await dispatch(removeFavoriteRecipe(id)).unwrap();
//       // optionally: show toast success
//     } catch (error) {
//       // show toast error
//     }
//   };

//   if (!recipes || recipes.length === 0) {
//     return <p className={css.empty}>No recipes found.</p>;
//   }

//   return (
//     <ul className={css.list}>
//       {recipes.map((recipe) => (
//         <li key={recipe._id} className={css.item}>
//           <RecipeCard
//             recipe={recipe}
//             onRemoveFavorite={isFavorites ? handleRemoveFavorite : undefined}
//           />
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default RecipesList;

