import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Container from '../Container/Container';
import css from './Footer.module.css';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className={css.footer}>
      <Container>
        <div className={css.footerWrp}>
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
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
