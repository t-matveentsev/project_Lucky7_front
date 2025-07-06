import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './SearchRecipes.module.css';
import { validationSchema } from '../../helpers/schema';

const SearchRecipes = ({ onSearch }) => {
  return (
    <div>
      <div className={css.hero}>
        <div className={css.searchWrapper}>
          <h1 className={css.heroHeader}>Plan, Cook, and Share Your Flavors</h1>
          <div className={css.formikStyle}>
            <Formik
              initialValues={{ search: '' }}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                const cleanedQuery = values.search
                  .trim()
                  .toLowerCase()
                  .replace(/[\s-_]/g, '');
                onSearch(cleanedQuery);
                setSubmitting(false);
                resetForm();
              }}
            >
              {({ handleSubmit }) => (
                <Form
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                >
                  <div className={css.searchForm}>
                    <Field
                      as="input"
                      type="text"
                      name="search"
                      id="search"
                      className={css.input}
                      placeholder="Search recipes"
                    />
                    <button type="submit" className={css.button}>
                      Search
                    </button>
                  </div>
                  <ErrorMessage
                    name="search"
                    component="div"
                    className={css.error}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchRecipes;
