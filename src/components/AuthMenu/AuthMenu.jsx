import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './AuthMenu.module.css';

const getNavStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const AuthMenu = ({ onToggleMenu }) => {
  return (
    <ul className={css.menu}>
      <li className={css.item}>
        <NavLink className={getNavStyles} to="/" onClick={onToggleMenu}>
          Recipes
        </NavLink>
      </li>
      <li className={css.item}>
        <NavLink
          className={getNavStyles}
          to="/auth/login"
          onClick={onToggleMenu}
        >
          Log in
        </NavLink>
      </li>
      <li className={css.item}>
        <NavLink
          className={css.notBtn}
          to="/auth/register"
          onClick={onToggleMenu}
        >
          Register
        </NavLink>
      </li>
    </ul>
  );
};

export default AuthMenu;
