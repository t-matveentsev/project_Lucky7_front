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

const UserMenu = ({ onLink }) => {
  // const { name } = useSelector(selectUser);
  const user = useSelector(selectUser);
  // console.log('user from Redux:', user);
  const name = user?.name ?? 'User';

  const userNameLetter = name[0].toUpperCase();

  const [isOpen, setIsOpen] = useState(false);

  const onLogOut = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ul className={css.menu}>
        <li className={css.item}>
          <NavLink className={getNavStyles} to="/" onClick={onLink}>
            Recipes
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink className={getNavStyles} to="/profile/own" onClick={onLink}>
            My Profile
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink className={css.notBtn} to="/add-recipe" onClick={onLink}>
            Add Recipe
          </NavLink>
        </li>
        <li className={css.item}>
          <div className={css.user}>
            <div className={css.letter}>{userNameLetter}</div>
            <p className={css.name}>{name}</p>
            <button className={css.logout} onClick={onLogOut}>
              <svg width="17" height="16">
                <use href="../../../icons/icons.svg#icon-logout"></use>
              </svg>
            </button>
          </div>
        </li>
      </ul>
      <div className={clsx(css.modalBack, `${isOpen ? css.open : ''}`)}>
        <LogOutModal onLogOut={onLogOut} onBtn={onLink} />
      </div>
    </>
  );
};

export default UserMenu;
