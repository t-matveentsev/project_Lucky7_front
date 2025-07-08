import { NavLink } from 'react-router-dom';
import css from './ProfileNavigation.module.css';

const tabs = [
  { type: 'own', label: 'My Recipes' },
  { type: 'favorites', label: 'Saved Recipes' },
];

const ProfileNavigation = () => {
  return (
    <nav className={css.nav}>
      {tabs.map(tab => (
        <NavLink
          key={tab.type}
          to={`/profile/${tab.type}`}
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.active}` : css.link
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default ProfileNavigation;
