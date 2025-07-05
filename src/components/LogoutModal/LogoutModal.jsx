import { Link, useNavigate } from 'react-router-dom';
import css from './LogoutModal.module.css';
import { useDispatch } from 'react-redux';
import { logOutThunk } from '../../redux/auth/operation';

const LogOutModal = ({ onLogOut }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOutThunk());
    navigate('/');
  };

  return (
    <div className={css.modal}>
      <button className={css.close} onClick={onLogOut}>
        <svg width="16" height="16">
          <use href="../../../icons.svg#icon-closer"></use>
        </svg>
      </button>
      <p className={css.quest}>Are you sure?</p>
      <p className={css.text}>We will miss you!</p>
      <div className={css.btnsWrp}>
        <Link className={css.cancel} onClick={onLogOut}>
          Cancel
        </Link>
        <Link className={css.logout} onClick={handleLogOut}>
          Log out
        </Link>
      </div>
    </div>
  );
};

export default LogOutModal;
