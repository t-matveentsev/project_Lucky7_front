import { useDispatch } from 'react-redux';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { usersLogin } from '../../helpers/schema';
import { loginThunk } from '../../redux/auth/operation';
import { useState } from 'react';
import s from './LoginForm.module.css';



const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, options) => {
    dispatch(loginThunk(values))
      .unwrap()
      .then(() => {
        navigate('/', { replace: true });
        options.resetForm();
      })
      .catch(() =>
        options.setFieldError('password', 'invalid email or password')
      )
      .finally(() => options.setSubmitting(false));
  };

  return (
    <div className={s.formWrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={usersLogin}
      >
        <Form className={s.form}>
          <h2 className={s.title}>Login</h2>

          <label className={s.label} htmlFor="email">
            Enter your email address
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="email@gmail.com"
              className={s.input}
            />
            <ErrorMessage name="email" component="div" className={s.error} />
          </label>

          <label className={s.label} htmlFor="password">
            Create a strong password
            <div className={s.passwordField}>
              <Field
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="*********"
                className={s.input}
              />
              <span
  className={s.eyeIcon}
  onClick={() => setShowPassword(!showPassword)}
  role="button"
  aria-label="Toggle password visibility"
>
  <svg className={s.icon}>
    <use xlinkHref={`/icons.svg#${showPassword ? 'icon-' : 'icon-'}`} />
  </svg>
</span>
            </div>
            <ErrorMessage name="password" component="div" className={s.error} />
          </label>

          <button type="submit" className={s.loginBtn}>
            Login
          </button>

          <div className={s.redirectInfo}>
            <p>Don’t have an account? <Link className={s.redirectLink} to="/register">Register</Link></p>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;