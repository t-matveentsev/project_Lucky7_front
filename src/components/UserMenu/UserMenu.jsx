import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './UserMenu.module.css';
import LogOutModal from '../LogoutModal/LogoutModal';
import { useState } from 'react';
import { selectUser } from '../../redux/auth/selectors';
import { logOutThunk } from '../../redux/auth/operation';

const getNavStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const UserMenu = ({ onLink }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const name = user?.name ?? 'User';

  const userNameLetter = name[0]?.toUpperCase() || 'U';

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmLogout = async () => {
    await dispatch(logOutThunk());
    setIsModalOpen(false);
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
            <button className={css.logout} onClick={handleOpenModal}>
              <svg width="17" height="16">
                <use href="../../../icons/icons.svg#icon-logout"></use>
              </svg>
            </button>
          </div>
        </li>
      </ul>

      {isModalOpen && (
        <div className={clsx(css.modalBack, css.open)}>
          <LogOutModal
            onConfirm={handleConfirmLogout}
            onCancel={handleCloseModal}
          />
        </div>
      )}
    </>
  );
};

export default UserMenu;
