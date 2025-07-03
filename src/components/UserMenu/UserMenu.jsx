import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './UserMenu.module.css';
import { selectUser } from '../../redux/auth/selectors';

const getNavStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const UserMenu = () => {
  const user = useSelector(selectUser);
  // const userNameLetter = user.name[0].toUpperCase();

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
          {/* <div>{userNameLetter}</div> */}
          <p>{user?.name}</p>
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
