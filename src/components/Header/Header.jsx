import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthMenu from '../AuthMenu/AuthMenu';
import css from './Header.module.css';
import { useState } from 'react';
import clsx from 'clsx';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <Navigation />
        <div className={css.menu}>
          {isLoggedIn ? <UserMenu /> : <AuthMenu />}
        </div>
        <button
          className={clsx(css.burger, `${isOpen ? css.open : ''}`)}
          onClick={toggleMenu}
        >
          <svg width="20" height="14">
            <use href="../../../icons.svg#icon-burger"></use>
          </svg>
        </button>
        <button
          className={clsx(css.close, `${isOpen ? css.open : ''}`)}
          onClick={toggleMenu}
        >
          <svg width="22" height="22">
            <use href="../../../icons.svg#icon-close"></use>
          </svg>
        </button>
      </nav>
      <div className={clsx(css.mobMenu, `${isOpen ? css.open : ''}`)}>
        {isLoggedIn ? <UserMenu /> : <AuthMenu />}
      </div>
    </header>
  );
};

export default Header;
