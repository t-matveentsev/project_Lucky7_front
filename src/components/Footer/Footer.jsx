import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import css from './Footer.module.css';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className={css.footer}>
      <Navigation />
      <p className={css.copy}>
        &#169; 2025 CookingCompanion. All rights reserved.
      </p>
      <div className={css.div}>
        <Link className={css.link} to="/">
          Recipes
        </Link>
        {location.pathname !== '/auth/register' &&
          location.pathname !== '/auth/login' && (
            <Link className={css.link} to="/profile/own">
              Account
            </Link>
          )}
      </div>
    </footer>
  );
};

export default Footer;
