import React, { useState } from 'react';
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
          {({ isSubmitting, values }) => (
            <Form className={s.form}>
              <div className={s.fieldBlock}>
                <label htmlFor="name" className={s.label}>
                  Enter your name
                  <Field id="name" name="name" placeholder="Max" />
                  <ErrorMessage name="name" component="div" />
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
                  />
                  <ErrorMessage name="email" component="div" />
                </label>
              </div>
              <div className={s.fieldBlock}>
                <label htmlFor="password" className={s.label}>
                  Create a strong password
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="*********"
                  />
                  <ErrorMessage name="password" component="div" />
                </label>
              </div>

              <div className={s.fieldBlock}>
                <label htmlFor="confirmPassword" className={s.label}>
                  Repeat your password
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="*********"
                  />
                  <ErrorMessage name="confirmPassword" component="div" />
                </label>
              </div>
              <label htmlFor="agree" className={s.labelChekbox}>
                <Field
                  id="agree"
                  name="agree"
                  type="checkbox"
                />
                I agree to the Terms of Service and Privacy Policy
              </label>

              <ErrorMessage name="agree" component="div" />

              {serverError && <div>{serverError}</div>}

              <button type="submit" className={s.registerButton} disabled={isSubmitting || !values.agree}>
                Create account
              </button>

              <p className={s.registerText}>
                Already have an account?{' '}
                <Link to="/login" className={s.registerLink}>
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
