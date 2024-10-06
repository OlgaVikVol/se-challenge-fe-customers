import * as Yup from 'yup';

// RegEx for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation schema using Yup
export const customerFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Email is invalid')
    .matches(emailRegex, 'Email format is incorrect') 
    .required('Email is required'),
  channel: Yup.string().oneOf(
    ['website', 'email', 'phone', 'word-of-mouth', 'other', 'unknown'],
    'Invalid channel'
  ),
  address: Yup.string().optional(),
  postal: Yup.string().optional(),
  city: Yup.string().optional(),
  province: Yup.string().optional(),
});
