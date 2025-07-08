import { useDispatch } from 'react-redux';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { usersLogin } from '../../helpers/schema';
import { loginThunk } from '../../redux/auth/operation';
import { useEffect, useState } from 'react';
import s from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [screenSize, setScreenSize] = useState(getScreenSize());

  function getScreenSize() {
    const width = window.innerWidth;
    if (width >= 1024) return 'desk';
    if (width >= 768) return 'tablet';
    return 'mob';
  }

  useEffect(() => {
    const handleResize = () => setScreenSize(getScreenSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const getVisibilityIcon = isVisible =>
    `${
      isVisible ? 'icon-pwd-visiability' : 'icon-pwd-visiability-none'
    }-${screenSize}`;
  return (
    <div className={s.backdrop}>
      <div className={s.formWrapper}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={usersLogin}
        >
          {({ errors, touched }) => (
            <Form className={s.form}>
              <h2 className={s.title}>Login</h2>
              <label className={s.label} htmlFor="email">
                Enter your email address
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@gmail.com"
                  className={touched.name && errors.name ? s.invalid : s.input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={s.error}
                />
              </label>
              <div className={s.fieldBlock}>
                <label htmlFor="password" className={s.label}>
                  Enter your password
                  <div className={s.passwordWrapper}>
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="*********"
                      className={
                        touched.password && errors.password
                          ? s.invalid
                          : s.input
                      }
                    />
                    <button
                      type="button"
                      className={s.togglePassword}
                      data-visible={showPassword}
                      onClick={togglePasswordVisibility}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      <svg className={s.toggleIcon}>
                        <use
                          href={`../../../icons/icons.svg#${getVisibilityIcon(
                            showPassword
                          )}`}
                        />
                      </svg>
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={s.error}
                  />
                </label>
              </div>

              <button type="submit" className={s.loginBtn}>
                Login
              </button>

              <p className={s.redirectInfo}>
                Don’t have an account?{' '}
                <Link className={s.redirectLink} to="/auth/register">
                  Register
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
