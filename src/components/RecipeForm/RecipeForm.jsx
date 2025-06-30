import { Formik, Form, Field } from 'formik';
import css from './RecipeForm.module.css';

const RecipeForm = () => {
  return (
    <Formik>
      <Form className={css.recipeForm}>
        <h2 className={css.title}>Add Recipe</h2>

        <label className={css.label}>Upload Photo</label>
        <input type="" className={css.photo} />

        <h3 className={css.description}>General Information</h3>

        <label className={css.label}>Recipe Title</label>
        <Field name="" placeholder="" className={css.input} />

        <label className={css.label}>Recipe Description</label>
        <Field name="" as="textarea" placeholder="" className={css.textarea} />

        <label className={css.label}>Cooking time in minutes</label>
        <Field name="" type="" className={css.input} />

        <label className={css.label}>Calories</label>
        <Field name="" type="" className={css.input} />

        <label className={css.label}>Category</label>
        <Field name="" as="" className={css.input}></Field>

        <label className={css.label}>Upload Photo</label>

        <h3 className={css.description}>Ingredients</h3>
        <FieldArray name="ingredients" className={css.array}>
          {() => (
            <>
              <div className={css.array}>
                <Field as="" name="" className={css.input}></Field>
                <Field name="" placeholder="" className={css.input} />
                <button type="button" className={css.buttonRemove}>
                  Remove last Ingredient
                </button>
                <button type="button" className={css.button}>
                  Add new Ingredient
                </button>
              </div>
            </>
          )}
        </FieldArray>

        <h3 className={css.description}>Instructions</h3>
        <Field as="" name="" placeholder="" className={css.input} />
        <button className={css.button} type="submit">
          Publish Recipe
        </button>
      </Form>
    </Formik>
  );
};

export default RecipeForm;
