import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthMenu from '../AuthMenu/AuthMenu';
import css from './Header.module.css';
import { useState } from 'react';
import clsx from 'clsx';
import Container from '../Container/Container';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={css.header}>
      <Container>
        <nav className={css.nav}>
          <Navigation />
          <div className={css.menu}>
            {isLoggedIn ? (
              <UserMenu onToggleMenu={toggleMenu} />
            ) : (
              <AuthMenu onToggleMenu={toggleMenu} />
            )}
          </div>
          <button
            className={clsx(css.burger, isOpen && css.open)}
            onClick={toggleMenu}
          >
            <svg width="20" height="14">
              <use href="../../../icons/icons.svg#icon-burger"></use>
            </svg>
          </button>
          <button
            className={clsx(css.close, isOpen && css.open)}
            onClick={toggleMenu}
          >
            <svg width="22" height="22">
              <use href="../../../icons/icons.svg#icon-close"></use>
            </svg>
          </button>
        </nav>
      </Container>
      <div className={clsx(css.mobMenu, isOpen && css.open)}>
        {isLoggedIn ? (
          <UserMenu onToggleMenu={toggleMenu} />
        ) : (
          <AuthMenu onToggleMenu={toggleMenu} />
        )}
      </div>
    </header>
  );
};

export default Header;
