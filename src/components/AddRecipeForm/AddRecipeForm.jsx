import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { useEffect, useId, useMemo } from 'react';
import { addRecipeSchema } from '../../helpers/schema';

import css from './RecipeForm.module.css';
import RecipeIngredientsList from '../RecipeIngredientsList/RecipeIngredientsList';
import DropdownField from '../DropdownField/DropdownField';

import { fetchCategory } from '../../redux/category/operation';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategory,
  selectRequestState as selectCategoryRequest,
} from '../../redux/category/selectors';
import { selectIngredients } from '../../redux/ingredients/selectors';
import { fetchData as fetchIngredients } from '../../redux/ingredients/operation';
import { addRecipe } from '../../redux/recipes/operations';

const initialValues = {
  title: '',
  description: '',
  time: '',
  calories: '',
  category: '',
  ingredients: [],
  newIngredient: { name: '', amount: '' },
  instructions: '',
};

const AddRecipeForm = () => {
  const titleId = useId();
  const descriptionId = useId();
  const timeId = useId();
  const caloriesId = useId();
  const categoryId = useId();

  const dispatch = useDispatch();
  const categories = useSelector(selectCategory);
  const ingredientList = useSelector(selectIngredients);

  const categoryRequest = useSelector(selectCategoryRequest);

  const memoizedInitialValues = useMemo(
    () => ({
      ...initialValues,
      category: categories[0]?.name,
    }),
    [categories]
  );

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleIngredientPush = (values, push, setFieldValue) => {
    const { newIngredient } = values;

    push({
      ...newIngredient,
      tmpId: Math.random().toString(16).slice(2),
    });

    setFieldValue('newIngredient.name', '');
    setFieldValue('newIngredient.amount', '');
  };

  // recipe result example:
  // {
  //     "title": "Some recipe",
  //     "description": "Some description",
  //     "time": "5",
  //     "calories": "200",
  //     "category": "Dessert",
  //     "ingredients": [
  //         {
  //             "name": "Pears",
  //             "amount": "100 g",
  //         }
  //     ],
  //     "instructions": "First step, second step, third step",
  // }

  const handleSubmit = (values, actions) => {
    // eslint-disable-next-line no-unused-vars
    let { newIngredient, ...recipe } = values;

    recipe.ingredients = recipe.ingredients.map(ingr => {
      delete ingr.tmpId;
      return ingr;
    });

    dispatch(addRecipe(recipe));
    actions.resetForm();
  };

  if (categoryRequest !== 'fulfilled') {
    return <div>Loading page...</div>;
  }

  return (
    <Formik
      initialValues={memoizedInitialValues}
      onSubmit={handleSubmit}
      validationSchema={addRecipeSchema}
    >
      {({ values, setFieldValue }) => (
        <Form className={css.recipeForm}>
          <h2 className={css.title}>Add Recipe</h2>

          <div>
            <label className={css.label}>Upload Photo</label>
            <input type="" className={css.photo} />
          </div>

          <h3 className={css.description}>General Information</h3>

          <div>
            <label className={css.label} htmlFor={titleId}>
              Recipe Title
            </label>
            <Field
              name="title"
              id={titleId}
              placeholder="Enter the name of your recipe"
              className={css.input}
            />
            <ErrorMessage
              className={css.errorMessage}
              name="title"
              component="span"
            />
          </div>

          <div>
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
            <ErrorMessage
              className={css.errorMessage}
              name="description"
              component="span"
            />
          </div>

          <div>
            <label className={css.label} htmlFor={timeId}>
              Cooking time in minutes
            </label>
            <Field name="time" id={timeId} type="" className={css.input} />
            <ErrorMessage
              className={css.errorMessage}
              name="time"
              component="span"
            />
          </div>

          <div>
            <label className={css.label} htmlFor={caloriesId}>
              Calories
            </label>
            <Field
              name="calories"
              id={caloriesId}
              type=""
              className={css.input}
            />
            <ErrorMessage
              className={css.errorMessage}
              name="calories"
              component="span"
            />
          </div>

          <div>
            <label className={css.label} htmlFor={categoryId}>
              Category
            </label>
            <Field
              name="category"
              id={categoryId}
              as="select"
              className={css.input}
            >
              <DropdownField items={categories} fieldName="name" />
            </Field>
            <ErrorMessage
              className={css.errorMessage}
              name="category"
              component="span"
            />
          </div>

          <div>
            <h3 className={css.description}>Ingredients</h3>
            <FieldArray name="ingredients" className={css.array}>
              {({ push, remove }) => (
                <div className={css.array}>
                  <Field
                    name="newIngredient.name"
                    as="select"
                    className={css.input}
                  >
                    <DropdownField items={ingredientList} fieldName="name" />
                  </Field>
                  <Field name="newIngredient.amount" className={css.input} />

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
                  {values.ingredients.length === 0 && (
                    <ErrorMessage
                      className={css.errorMessage}
                      name="ingredients"
                      component="span"
                    />
                  )}
                </div>
              )}
            </FieldArray>
          </div>

          {/* for testing */}
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          {/* for testing */}

          <div>
            <h3 className={css.description}>Instructions</h3>
            <Field
              as=""
              name="instructions"
              placeholder="Enter a text"
              className={css.input}
            />
            <ErrorMessage
              className={css.errorMessage}
              name="instructions"
              component="span"
            />
          </div>

          <button className={css.button} type="submit">
            Publish Recipe
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddRecipeForm;
