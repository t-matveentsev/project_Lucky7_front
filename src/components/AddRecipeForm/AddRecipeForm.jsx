import { Formik, Form, Field, FieldArray } from 'formik';
import { useId } from 'react';

import css from './RecipeForm.module.css';
import RecipeIngredientsList from '../RecipeIngredientsList/RecipeIngredientsList';

const initialValues = {
  title: '',
  description: '',
  cookingTime: '',
  calories: '',
  category: '',
  ingredients: [],
  newIngredient: { name: '', amount: '' },
  instructions: '',
  photo: '',
};

const AddRecipeForm = () => {
  const titleId = useId();
  const descriptionId = useId();
  const cookingTimeId = useId();
  const caloriesId = useId();
  const categoryId = useId();

  const handleIngredientPush = (values, push, setFieldValue) => {
    push({ ...values.newIngredient, id: Math.random().toString(16).slice(2) });

    setFieldValue('newIngredient.name', '');
    setFieldValue('newIngredient.amount', '');
  };

  const handleSubmit = (values, actions) => {
    // eslint-disable-next-line no-unused-vars
    const { newIngredient, ...recipe } = values;
    //useDispatch
    actions.resetForm();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form className={css.recipeForm}>
          <h2 className={css.title}>Add Recipe</h2>

          <label className={css.label}>Upload Photo</label>
          <input type="" className={css.photo} />

          <h3 className={css.description}>General Information</h3>

          <label className={css.label} htmlFor={titleId}>
            Recipe Title
          </label>
          <Field
            name="title"
            id={titleId}
            placeholder="Enter the name of your recipe"
            className={css.input}
          />

          <label className={css.label} htmlFor={descriptionId}>
            Recipe Description
          </label>
          <Field
            name="description"
            id={descriptionId}
            as="textarea"
            placeholder="Enter a brief description of your recipe"
            className={css.textarea}
          />

          <label className={css.label} htmlFor={cookingTimeId}>
            Cooking time in minutes
          </label>
          <Field
            name="cookingTime"
            id={cookingTimeId}
            type=""
            className={css.input}
          />

          <label className={css.label} htmlFor={caloriesId}>
            Calories
          </label>
          <Field
            name="calories"
            id={caloriesId}
            type=""
            className={css.input}
          />

          <label className={css.label} htmlFor={categoryId}>
            Category
          </label>
          <Field
            name="category"
            id={categoryId}
            as=""
            className={css.input}
          ></Field>

          <h3 className={css.description}>Ingredients</h3>
          <FieldArray name="ingredients" className={css.array}>
            {({ push, remove }) => (
              <div className={css.array}>
                <Field
                  name="newIngredient.name"
                  as=""
                  className={css.input}
                ></Field>
                <Field
                  name="newIngredient.amount"
                  placeholder=""
                  className={css.input}
                />

                <button
                  onClick={() =>
                    handleIngredientPush(values, push, setFieldValue)
                  }
                  type="button"
                  className={css.button}
                >
                  Add new Ingredient
                </button>

                <RecipeIngredientsList
                  ingredients={values.ingredients}
                  onIngredientDeleted={remove}
                />
              </div>
            )}
          </FieldArray>

          {/* for testing */}
          <pre>{JSON.stringify(values, null, 2)}</pre>

          <h3 className={css.description}>Instructions</h3>
          <Field
            as=""
            name="instructions"
            placeholder="Enter a text"
            className={css.input}
          />

          <button className={css.button} type="submit">
            Publish Recipe
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddRecipeForm;
