import css from './LogoutModal.module.css';

const LogOutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={css.modal}>
      <button className={css.close} onClick={onCancel}>
        <svg width="16" height="16">
          <use href="../../../icons/icons.svg#icon-closer"></use>
        </svg>
      </button>
      <p className={css.quest}>Are you sure?</p>
      <p className={css.text}>We will miss you!</p>
      <div className={css.btnsWrp}>
        <button className={css.cancel} onClick={onCancel}>
          Cancel
        </button>
        <button className={css.logout} onClick={onConfirm}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
