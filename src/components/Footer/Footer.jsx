import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Footer = () => {
  const location = useLocation();

  return (
    <footer>
      <Navigation />
      <p>&#169; 2025 CookingCompanion. All rights reserved.</p>
      <Link to="/">Recipes</Link>
      {(location.pathname !== '/auth/register' ||
        location.pathname !== '/auth/login') && (
        <Link to="/profile/own">Account</Link>
      )}
    </footer>
  );
};

export default Footer;
