import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './UserMenu.module.css';
import LogOutModal from '../LogoutModal/LogoutModal';
import { useState } from 'react';
import { selectUser } from '../../redux/auth/selectors';

const getNavStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const UserMenu = ({ onToggleMenu }) => {
  const user = useSelector(selectUser);
  const name = user?.name ?? 'User';

  const userNameLetter = name[0]?.toUpperCase() || 'U';

  const [isOpen, setIsOpen] = useState(false);

  const toggleLogOut = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ul className={css.menu}>
        <li className={css.item}>
          <NavLink className={getNavStyles} to="/" onClick={onToggleMenu}>
            Recipes
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink
            className={getNavStyles}
            to="/profile/own"
            onClick={onToggleMenu}
          >
            My Profile
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink
            className={css.notBtn}
            to="/add-recipe"
            onClick={onToggleMenu}
          >
            Add Recipe
          </NavLink>
        </li>
        <li className={css.item}>
          <div className={css.user}>
            <div className={css.letter}>{userNameLetter}</div>
            <p className={css.name}>{name}</p>
            <button className={css.logout} onClick={toggleLogOut}>
              <svg width="17" height="16">
                <use href="../../../icons/icons.svg#icon-logout"></use>
              </svg>
            </button>
          </div>
        </li>
      </ul>
      <div className={clsx(css.modalBack, isOpen && css.open)}>
        <LogOutModal
          onToggleLogOut={toggleLogOut}
          onToggleMenu={onToggleMenu}
        />
      </div>
    </>
  );
};

export default UserMenu;
