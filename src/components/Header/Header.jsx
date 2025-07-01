import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthMenu from '../AuthMenu/AuthMenu';

const Header = () => {
  const isLoggedIn = false;

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
