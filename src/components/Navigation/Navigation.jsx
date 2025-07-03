import { Link } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = () => {
  return (
    <div>
      <Link className={css.logo} to="/">
        <svg>
          <use></use>
        </svg>
      </Link>
      <Link className={css.name} to="/">
        Tasteorama
      </Link>
    </div>
  );
};

export default Navigation;
