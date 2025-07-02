import * as Yup from 'yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { MdOutlineMailOutline, MdVisibility, MdVisibilityOff, MdLock } from 'react-icons/md';
import { loginThunk } from '../../redux/auth/operation';
import { usersLogin } from '../../helpers/schema';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { Link, useNavigate } from 'react-router-dom';
import s from './LoginForm.module.css';


const usersLogin = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(usersLogin),
    mode: 'onChange',
  });

  const onSubmit = async data => {
    try {
      await dispatch(loginThunk(data)).unwrap();
      reset();
      setLoginError(null);
      navigate('/');
    } catch (error) {
       setLoginError('Incorrect email or password. Please try again.');
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
            <div className={s.inputWrapper}>
              <MdOutlineMailOutline className={s.icon} />
              <input
                id="email"
                type="email"
                placeholder="email@gmail.com"
                className={`${s.input} ${errors.email ? s.error : ''}`}
                {...register('email')}
              />
            </div>
            {errors.email && <p className={s.errorText}>{errors.email.message}</p>}
          </div>

          <div className={s.fieldBlock}>
            <label className={s.label} htmlFor="password">
              Create a strong password
            </label>
            <div className={s.inputWrapper}>
              <MdLock className={s.icon} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                className={`${s.input} ${errors.password ? s.error : ''}`}
                {...register('password')}
              />
              <button
                type="button"
                className={s.toggleBtn}
                onClick={() => setShowPassword(prev => !prev)}
              >
               {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
            {errors.password && <p className={s.errorText}>{errors.password.message}</p>}
          </div>

           {loginError && <p className={s.errorText}>{loginError}</p>}

          <LoadMoreBtn type="submit" text="Login" variant="brownButton" />

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