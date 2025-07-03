import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthMenu from '../AuthMenu/AuthMenu';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header>
      <nav>
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthMenu />}
      </nav>
    </header>
  );
};

export default Header;
