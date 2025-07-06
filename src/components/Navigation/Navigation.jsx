import { Link } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = () => {
  return (
    <div className={css.nav}>
      <Link className={css.logo} to="/">
        <svg width="32" height="30">
          <use href="../../../icons/icons.svg#icon-logo"></use>
        </svg>
      </Link>
      <Link className={css.name} to="/">
        Tasteorama
      </Link>
    </div>
  );
};

export default Navigation;
