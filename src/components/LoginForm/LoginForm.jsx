import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MdOutlineMailOutline, MdLock } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/auth/operation.js';
//import { loginValidatiSchema } from '../../validations/validateLoginForm';//
//import InputFormField from '../../components/InputFormField/InputFormField';//
import { Link, useNavigate } from 'react-router-dom';
import s from './LoginForm.module.css';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginValidatiSchema),
    mode: 'onChange',
  });

  const onSubmit = async data => {
    try {
      await dispatch(loginThunk(data)).unwrap();
      reset();
      navigate('/');
    } catch (error) {
      showToast('error', 'Incorrect email or password. Please try again.');
    }
  };

  return (
    <div className={s.backdrop}>
      <div className={s.modal}>
        <h2 className={s.title}>Login</h2>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.fieldBlock}>
            <label className={s.label} htmlFor="email">
              Enter your email address
            </label>
            <InputFormField
              icon={MdOutlineMailOutline}
              type="email"
              name="email"
              placeholder="email@gmail.com"
              register={register}
              error={errors.email}
            />
          </div>

          <div className={s.fieldBlock}>
            <label className={s.label} htmlFor="password">
              Create a strong password
            </label>
            <InputFormField
              icon={MdLock}
              type="password"
              name="password"
              placeholder="********"
              register={register}
              error={errors.password}
              withToggle 
            />
          </div>

          <FormButton type="submit" text="Login" variant="brownButton" />

          <p className={s.registerText}>
            Don’t have an account?{' '}
            <Link to="/register" className={s.registerLink}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;