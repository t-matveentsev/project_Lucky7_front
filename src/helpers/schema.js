import * as Yup from 'yup';

const MAX_PHOTO_SIZE = 2 * 1024 * 1024; //2MB
const VALID_PHOTO_FORMATS = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const onlyLetters = /^[A-Za-zА-Яа-яЄєІіЇїҐґ-\s]+$/;
// const onlyNumber = /^\d+$/;
const onlyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const onlyUnits = /^\d+(\.\d+)?\s?(g|kg|ml|l|pcs|pieces|tbsp|tsp)?$/;

export const addRecipeSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    // .matches(onlyLetters, "The name cannot contain numbers!")
    .min(3, 'The name must be longer than 3 symbols!')
    .max(64, 'Maximum 64 symbols'),

  description: Yup.string()
    .required('Description is required')
    .min(10, 'The description must be longer than 10 symbols!')
    .max(200, 'Maximum 200 symbols'),

  time: Yup.number()
    .transform((_, val) => (val === '' ? undefined : Number(val)))
    .required('Cooking time is required')
    // .matches(onlyNumber, "Only numbers are allowed")
    .min(1)
    .max(360),
  calories: Yup.number()
    .transform((_, val) => (val === '' ? undefined : Number(val)))
    // .required('Calories field is required')
    // .matches(onlyNumber, "Only numbers are allowed")
    .min(1)
    .max(10000),

  category: Yup.string().required('Category is required'),

  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Ingredient name is required').max(20),
        measure: Yup.string()
          .required('Amount is required')
          .matches(onlyUnits, 'Only units of measurement: ml, l, g')
          .min(2)
          .max(16),
      })
    )
    .min(1, 'At least one ingredient is required'),

  instructions: Yup.string()
    .required('Instructions are required')
    .max(1200)
    .min(10, 'Instructions must be at least 10 characters'),

  thumb: Yup.mixed()
    .required()
    .test(
      'fileSize',
      'Image size must be less than 2MB',
      value => value.size <= MAX_PHOTO_SIZE
    )
    .test('fileType', 'Unsupported file type', value =>
      VALID_PHOTO_FORMATS.includes(value.type)
    ),
});

export const usersLogin = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .matches(onlyEmail, 'Invalid email format')
    .min(3, 'Email must be at least 3 characters long')
    .max(50, 'Email is too long')
    .trim(),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 8 characters long')
    .max(12, 'Password is too long'),
});

export const usersRegister = Yup.object().shape({
  name: Yup.string()
    .required('Field name is required')
    .matches(onlyLetters, 'The name cannot contain numbers!')
    .min(3, 'The name must be longer than 3 symbols!')
    .max(50, 'Maximum 50 symbols'),
  email: Yup.string()
    .matches(onlyEmail, 'Invalid email format')
    .email('Invalid email format')
    .required('Field email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Field password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  agree: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions'
  ),
});

export const validationSchema = Yup.object().shape({
  search: Yup.string()
    .required('First you need to fill in the search field.')
    .min(2, 'Search term must be at least 2 characters.')
    .matches(
      /^[a-zA-Z0-9\s\-_]+$/,
      'Recipe title must only contain letters, numbers, spaces, hyphens, or underscores.'
    ),
});
