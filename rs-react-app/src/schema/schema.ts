import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .matches(/^[A-Z].*/, 'First letter of name must be uppercased'),
  age: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value
    )
    .typeError('Age must be number')
    .required('Age is a required field')
    .positive('Age must be positive')
    .integer('Age must be integer'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is a required field'),
  password: yup
    .string()
    .required('Password is a required field')
    .matches(/[0-9]/, 'Password must contain one digit')
    .matches(/[a-z]/, 'Password must contain one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain one uppercase letter')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain one special character'),
  confirmPassword: yup
    .string()
    .required('Confirm password')
    .oneOf([yup.ref('password')], "Passwords don't match"),
  gender: yup.string().required('Select gender'),
  accept: yup
    .boolean()
    .required('This field is required')
    .oneOf([true], 'Accept terms'),
  picture: yup
    .mixed()
    .required('File is required')
    .test('fileType', 'Choose file', (value) => {
      if (value instanceof File) {
        return ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type);
      } else if (value instanceof FileList) {
        return value.length > 0;
      }
    })
    .test('fileType', 'The file must be png or jpeg', (value) => {
      if (value instanceof File) {
        return ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type);
      } else if (value instanceof FileList && value.length > 0) {
        return ['image/png', 'image/jpeg', 'image/jpg'].includes(value[0].type);
      }
    })
    .test('fileSize', 'The file is too large', (value) => {
      if (value instanceof File) {
        return value.size <= 5000000;
      } else if (value instanceof FileList && value.length > 0) {
        return value[0].size <= 5000000;
      }
    }),
  country: yup.string().required('Choose country'),
});

export type FormInput = yup.InferType<typeof schema>;
