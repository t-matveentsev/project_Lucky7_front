import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './UserMenu.module.css';

const getNavStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const UserMenu = () => {
  const { name } = useSelector(selectUser);
  const userNameLetter = name[0].toUpperCase();

  return (
    <ul>
      <li>
        <NavLink className={getNavStyles} to="/">
          Recipes
        </NavLink>
      </li>
      <li>
        <NavLink className={getNavStyles} to="/profile/own">
          My Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-recipe">Add Recipe</NavLink>
      </li>
      <li>
        <div>
          <div>{userNameLetter}</div>
          <p>{name}</p>
          <button>
            <svg>
              <use></use>
            </svg>
          </button>
        </div>
      </li>
    </ul>
  );
};

export default UserMenu;
