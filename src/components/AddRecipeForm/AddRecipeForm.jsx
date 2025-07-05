import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { useEffect, useId, useMemo, useState } from 'react';
import { addRecipeSchema } from '../../helpers/schema';

import css from './AddRecipeForm.module.css';
import RecipeIngredientsList from '../RecipeIngredientsList/RecipeIngredientsList';
import DropdownField from '../DropdownField/DropdownField';

import { fetchCategory } from '../../redux/category/operation';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategory,
  selectRequestState as selectCategoryRequest,
} from '../../redux/category/selectors';
import { selectIngredients } from '../../redux/ingredients/selectors';
import { fetchIngredients } from '../../redux/ingredients/operation';
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
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleIngredientPush = ({
    newIngredient,
    push,
    setFieldValue,
    setShowList,
  }) => {
    if (!newIngredient.name || !newIngredient.amount.trim()) return;

    push({
      ...newIngredient,
      tmpId: Math.random().toString(16).slice(2),
    });

    setFieldValue('newIngredient.name', '');
    setFieldValue('newIngredient.amount', '');
    setShowList(true);
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
    setShowList(false);
  };

  if (!categories.length || categoryRequest !== 'fulfilled') {
    return <div>Loading...</div>;
  }
  return (
    <Formik
      initialValues={memoizedInitialValues}
      onSubmit={handleSubmit}
      validationSchema={addRecipeSchema}
    >
      {({ values, setFieldValue, isValid, dirty }) => (
        <Form className={`${css.recipeForm} ${css.container}`}>
          <h2 className={css.title}>Add Recipe</h2>
          <div className={css.recipeInfo}>
            <div className={css.wrapperPhoto}>
              <h3 className={`${css.description} ${css.descriptionPhoto}`}>
                Upload Photo
              </h3>
              <label htmlFor="photoUpload" className={css.customUpload}>
                <svg className={css.svg}>
                  <use href="/public/icons.svg#icon-camera" />
                </svg>
              </label>
              <input type="file" id="photoUpload" className={css.photo} />
            </div>
            <div className={css.wrapperInfo}>
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
              <ErrorMessage
                className={css.errorMessage}
                name="title"
                component="span"
              />
              <label className={css.label} htmlFor={descriptionId}>
                Recipe Description
              </label>
              <Field
                name="description"
                id={descriptionId}
                as="textarea"
                placeholder="Enter a brief description of your recipe"
                className={`${css.input} ${css.textarea}`}
              />
              <ErrorMessage
                className={css.errorMessage}
                name="description"
                component="span"
              />
              <label className={css.label} htmlFor={timeId}>
                Cooking time in minutes
              </label>
              <Field
                name="time"
                id={timeId}
                type=""
                placeholder="10"
                className={css.input}
              />
              <ErrorMessage
                className={css.errorMessage}
                name="time"
                component="span"
              />
              <div className={css.CaloriesCategory}>
                <div className={css.fieldGroup}>
                  <label className={css.label} htmlFor={caloriesId}>
                    Calories
                  </label>
                  <Field
                    name="calories"
                    id={caloriesId}
                    type="text"
                    placeholder="150 cals"
                    className={css.input}
                  />
                  <ErrorMessage
                    className={css.errorMessage}
                    name="calories"
                    component="span"
                  />
                </div>

                <div className={css.fieldGroup}>
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
              </div>

              <h3 className={`${css.description} ${css.ingredients}`}>
                Ingredients
              </h3>

              <FieldArray name="ingredients">
                {({ push, remove }) => {
                  const { newIngredient, ingredients } = values;

                  return (
                    <>
                      <div className={css.array}>
                        <div className={css.group}>
                          <label className={css.label}>Name</label>
                          <Field
                            name="newIngredient.name"
                            as="select"
                            className={css.input}
                          >
                            <DropdownField
                              items={ingredientList}
                              fieldName="name"
                            />
                          </Field>
                        </div>
                        <div className={css.row}>
                          <div className={css.group}>
                            <label className={css.label}>Amount</label>
                            <Field
                              name="newIngredient.amount"
                              className={css.input}
                              placeholder="100g"
                            />
                          </div>
                          <button
                            type="button"
                            className={`${css.button} ${css.buttonAdd}`}
                            onClick={() =>
                              handleIngredientPush({
                                newIngredient,
                                push,
                                setFieldValue,
                                setShowList,
                              })
                            }
                            disabled={
                              !newIngredient.name ||
                              !newIngredient.amount.trim()
                            }
                          >
                            Add new Ingredient
                          </button>
                        </div>
                      </div>

                      {showList && ingredients.length > 0 && (
                        <RecipeIngredientsList
                          ingredients={ingredients}
                          onIngredientDeleted={remove}
                        />
                      )}

                      <ErrorMessage
                        name="ingredients"
                        component="span"
                        className={css.errorMessage}
                      />
                    </>
                  );
                }}
              </FieldArray>

              {/* for testing */}
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
              {/* for testing */}

              <h3 className={`${css.description} ${css.ingredients}`}>
                Instructions
              </h3>
              <Field
                as="textarea"
                name="instructions"
                placeholder="Enter a text"
                className={`${css.input} ${css.textarea}`}
              />
              <ErrorMessage
                className={css.errorMessage}
                name="instructions"
                component="span"
              />

              <button
                className={`${css.button} ${css.buttonPublish}`}
                type="submit"
                disabled={!isValid || !dirty}
              >
                Publish Recipe
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddRecipeForm;
