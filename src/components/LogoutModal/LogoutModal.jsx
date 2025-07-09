import { useNavigate } from 'react-router-dom';
import css from './LogoutModal.module.css';
import { useDispatch } from 'react-redux';
import { logOutThunk } from '../../redux/auth/operation';

const LogOutModal = ({ onToggleLogOut, onToggleMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await dispatch(logOutThunk());
    onToggleMenu();
    navigate('/');
  };

  return (
    <div className={css.modal}>
      <button className={css.close} onClick={onToggleLogOut}>
        <svg width="16" height="16">
          <use href="../../../icons/icons.svg#icon-closer"></use>
        </svg>
      </button>
      <p className={css.quest}>Are you sure?</p>
      <p className={css.text}>We will miss you!</p>
      <div className={css.btnsWrp}>
        <button className={css.cancel} onClick={onToggleLogOut}>
          Cancel
        </button>
        <button className={css.logout} onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
