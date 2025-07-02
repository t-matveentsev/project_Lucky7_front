import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthMenu from '../AuthMenu/AuthMenu';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header>
      <nav>
        <Navigation />
        <div>{isLoggedIn ? <UserMenu /> : <AuthMenu />}</div>
        <button>
          <svg>
            <use></use>
          </svg>
        </button>
        <button>
          <svg>
            <use></use>
          </svg>
        </button>
      </nav>
      <div>{isLoggedIn ? <UserMenu /> : <AuthMenu />}</div>
    </header>
  );
};

export default Header;
