import { NavLink, useParams } from 'react-router-dom';
import css from './ProfileNavigation.module.css';

const tabs = [
  { type: 'my', label: 'My' },
  { type: 'favorites', label: 'Favorites' },
  { type: 'saved', label: 'Saved' },
];

const ProfileNavigation = () => {
  const { recipeType } = useParams();

  return (
    <nav className={css.nav}>
      {tabs.map(tab => (
        <NavLink
          key={tab.type}
          to={`/profile/${tab.type}`}
          className={({ isActive }) =>
            isActive || recipeType === tab.type
              ? `${css.link} ${css.active}`
              : css.link
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default ProfileNavigation;
