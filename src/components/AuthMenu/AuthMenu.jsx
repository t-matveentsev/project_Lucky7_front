import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './AuthMenu.module.css';

const getNavStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const AuthMenu = () => {
  return (
    <ul>
      <li>
        <NavLink className={getNavStyles} to="/">
          Recipes
        </NavLink>
      </li>
      <NavLink className={getNavStyles} to="/auth/login">
        Log in
      </NavLink>
      <li>
        <NavLink to="/auth/register">Register</NavLink>
      </li>
    </ul>
  );
};

export default AuthMenu;
