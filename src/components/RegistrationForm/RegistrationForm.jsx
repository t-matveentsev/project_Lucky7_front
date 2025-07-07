import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/auth/operation';
import { Link, useNavigate } from 'react-router-dom';
import { usersRegister } from '../../helpers/schema';
import s from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setServerError(null);
    try {
      const { name, email, password } = values;
      await dispatch(registerThunk({ name, email, password })).unwrap();
      resetForm();
      navigate('/');
    } catch (error) {
      setServerError(error || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const getVisibilityIcon = isVisible =>
    `${
      isVisible ? 'icon-pwd-visiability' : 'icon-pwd-visiability-none'
    }-${screenSize}`;
  return (
    <div className={s.backdrop}>
      <div className={s.menu}>
        <h2 className={s.title}>Register</h2>
        <p className={s.description}>
          Join our community of culinary enthusiasts, save your favourite
          recipes, and share your cooking creations
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={usersRegister}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, errors, touched }) => (
            <Form className={s.form}>
              <div className={s.fieldBlock}>
                <label htmlFor="name" className={s.label}>
                  Enter your name
                  <Field
                    id="name"
                    name="name"
                    placeholder="Max"
                    className={
                      touched.name && errors.name ? s.invalid : s.input
                    }
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={s.error}
                  />
                </label>
              </div>
              <div className={s.fieldBlock}>
                <label htmlFor="email" className={s.label}>
                  Enter your email address
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@gmail.com"
                    className={
                      touched.email && errors.email ? s.invalid : s.input
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={s.error}
                  />
                </label>
              </div>
              <div className={s.fieldBlock}>
                <label htmlFor="password" className={s.label}>
                  Create a strong password
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
                          href={`/public/icons/icons.svg#${getVisibilityIcon(
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

              <div className={s.fieldBlock}>
                <label htmlFor="confirmPassword" className={s.label}>
                  Repeat your password
                  <div className={s.passwordWrapper}>
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="*********"
                      className={
                        touched.confirmPassword && errors.confirmPassword
                          ? s.invalid
                          : s.input
                      }
                    />
                    <button
                      type="button"
                      className={s.togglePassword}
                      data-visible={showConfirmPassword}
                      onClick={toggleConfirmPasswordVisibility}
                      aria-label={
                        showConfirmPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      <svg className={s.toggleIcon}>
                        <use
                          href={`/public/icons/icons.svg#${getVisibilityIcon(
                            showConfirmPassword
                          )}`}
                        />
                      </svg>
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className={s.error}
                  />
                </label>
              </div>
              <label htmlFor="agree" className={s.checkboxLabelWrapper}>
                <Field
                  id="agree"
                  name="agree"
                  type="checkbox"
                  className={s.checkbox}
                />
                <span className={s.checkmark}>
                  {values.agree && (
                    <svg className={s.checkmarkIcon}>
                      <use href="/public/icons/icons.svg#icon-checkbox-privacy-mobile" />
                    </svg>
                  )}
                </span>
                <span className={s.labelChekbox}>
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>
              <ErrorMessage name="agree" component="div" className={s.error} />

              {serverError && <div>{serverError}</div>}

              <button
                type="submit"
                className={s.registerButton}
                disabled={isSubmitting || !values.agree}
              >
                Create account
              </button>

              <p className={s.registerText}>
                Already have an account?{' '}
                <Link to="/auth/login" className={s.registerLink}>
                  Log in
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;

