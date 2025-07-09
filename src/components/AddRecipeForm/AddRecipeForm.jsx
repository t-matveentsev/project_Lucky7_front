import RecipeIngredientsList from '../RecipeIngredientsList/RecipeIngredientsList';
import DropdownField from '../DropdownField/DropdownField';
import toast from 'react-hot-toast';
import css from './AddRecipeForm.module.css';

import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { useEffect, useId, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIngredients } from '../../redux/ingredients/selectors';
import { selectRecipeError } from '../../redux/recipes/selectors';
import { fetchIngredients } from '../../redux/ingredients/operation';
import { addRecipeSchema } from '../../helpers/schema';
import { fetchCategory } from '../../redux/category/operation';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { addRecipe } from '../../redux/recipes/operations';
import {
  selectCategory,
  selectRequestState as selectCategoryRequest,
} from '../../redux/category/selectors';

const recipeToFormData = recipe => {
  console.log('recipe', recipe);
  const formData = new FormData();

  formData.append('title', recipe.title);
  formData.append('description', recipe.description);
  formData.append('time', recipe.time);
  formData.append('calories', recipe.calories);
  formData.append('category', recipe.category);
  formData.append('ingredients', JSON.stringify(recipe.ingredients));
  formData.append('instructions', recipe.instructions);
  formData.append('thumb', recipe.thumb);

  return formData;
};

const initialValues = {
  title: '',
  description: '',
  time: '',
  calories: '',
  category: '',
  ingredients: [],
  newIngredient: { name: '', measure: '' },
  instructions: '',
  thumb: '',
};

const AddRecipeForm = () => {
  const titleId = useId();
  const descriptionId = useId();
  const timeId = useId();
  const caloriesId = useId();
  const categoryId = useId();

  const [showList, setShowList] = useState(false);
  const [tmpPhoto, setTmpPhoto] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryRequest = useSelector(selectCategoryRequest);
  const ingredientList = useSelector(selectIngredients);
  const categories = useSelector(selectCategory);
  const error = useSelector(selectRecipeError);

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

  const handleIngredientPush = ({
    newIngredient,
    ingredients,
    push,
    setFieldValue,
    setShowList,
  }) => {
    if (!newIngredient.name || !newIngredient.measure.trim()) {
      return;
    }
    if (ingredients.find(ingr => ingr.name === newIngredient.name)) {
      toast.error(
        'Cannot add existing ingredient. In case you want to modify the existing one, consider deleting and adding it with new values.',
        {
          position: 'bottom-left',
          duration: 5500,
        }
      );
      return;
    }

    const id = ingredientList.find(
      ingr => ingr.name === newIngredient.name
    )._id;

    push({
      ...newIngredient,
      id,
    });

    setFieldValue('newIngredient.name', '');
    setFieldValue('newIngredient.measure', '');
    setShowList(true);
  };

  const handleImageChange = ({ photoFile, setFieldValue }) => {
    if (!photoFile) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFieldValue('thumb', photoFile, true);
      setTmpPhoto(reader.result);
    };

    reader.readAsDataURL(photoFile);
  };

  const handleSubmit = async (values, actions) => {
    let { newIngredient, ...recipe } = values;

    recipe.ingredients = recipe.ingredients.map(ingr => {
      delete ingr.name;
      return ingr;
    });

    const formData = recipeToFormData(recipe);

    try {
      const result = await dispatch(addRecipe(formData)).unwrap(); // ← отримуємо дані рецепту
      actions.resetForm();
      setShowList(false);

      if (result._id) {
        navigate(`/recipes/${result._id}`); // ← редірект
      } else {
        toast.error('Could not navigate — missing recipe ID');
      }
    } catch (error) {
      toast.error(`Failed to add recipe: ${error}`);
    }
  };

  if (!categories.length) {
    return <div className={css.errorMessage}>No categories found</div>;
  }

  if (error) {
    return (
      <div className={css.errorMessage}>
        An error has occurred while adding a new recipe
      </div>
    );
  }

  return (
    <div>
      {categoryRequest !== 'fulfilled' && (
        <div className={css.loader}>
          <HashLoader
            color={'#9B6C43'}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <Formik
        initialValues={memoizedInitialValues}
        onSubmit={handleSubmit}
        validationSchema={addRecipeSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values, setFieldValue }) => (
          <Form className={`${css.recipeForm} ${css.container}`}>
            <h2 className={css.title}>Add Recipe</h2>
            <div className={css.recipeInfo}>
              <div className={css.wrapperPhoto}>
                <h3 className={`${css.description} ${css.descriptionPhoto}`}>
                  Upload Photo
                </h3>
                <label htmlFor="photoUpload" className={css.customUpload}>
                  {tmpPhoto ? (
                    <div>
                      <img className={css.loadedPhoto} src={tmpPhoto} />
                    </div>
                  ) : (
                    <svg className={css.svg}>
                      <use href="/icons/icons.svg#icon-camera" />
                    </svg>
                  )}
                </label>
                <input
                  type="file"
                  name="thumb"
                  accept="image/*"
                  id="photoUpload"
                  className={css.photo}
                  onChange={e => {
                    handleImageChange({
                      photoFile: e.target.files[0],
                      setFieldValue,
                    });
                  }}
                />
                <ErrorMessage
                  name="thumb"
                  component="span"
                  className={css.errorMessage}
                />
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
                  className={css.textarea}
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
                      <DropdownField items={categories} fieldName={'name'} />
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
                                fieldName={'name'}
                              />
                            </Field>
                          </div>
                          <div className={css.row}>
                            <div className={css.group}>
                              <label className={css.label}>Amount</label>
                              <Field
                                name="newIngredient.measure"
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
                                  ingredients,
                                  push,
                                  setFieldValue,
                                  setShowList,
                                })
                              }
                              disabled={
                                !newIngredient.name ||
                                !newIngredient.measure.trim()
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
                <h3 className={`${css.description} ${css.ingredients}`}>
                  Instructions
                </h3>
                <Field
                  as="textarea"
                  name="instructions"
                  placeholder="Enter a text"
                  className={css.textarea}
                />
                <ErrorMessage
                  className={css.errorMessage}
                  name="instructions"
                  component="span"
                />
                <button
                  className={`${css.button} ${css.buttonPublish}`}
                  type="submit"
                >
                  Publish Recipe
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipeForm;
